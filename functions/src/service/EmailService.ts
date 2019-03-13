import { Request, Response } from 'express';
import { ResponseEmailModel } from '../model/email/response/ResponseEmailModel';
import { EmailDao } from '../dao/EmailDao'
import * as mail from 'nodemailer'
import { plainToClass } from "class-transformer";
import { EmailModel } from '../model/email/data/EmailModel';
import { EmailTemplate } from '../constant/EmailTemplate'
import { UserService } from '../service/UserService'
import { UserModel } from '../model/user/data/UserModel';
import { TaskService } from './TaskService';
import { ResponseCommon } from '../model/common/ResponseCommon';
import { StringUtils } from '../utils/StringUtils';
import { BeConstant } from '../constant/BeConstant';
import { TaskModel } from '../model/task/data/TaskModel';


export class EamilService{

    emailDao = new EmailDao()
    taskService = new TaskService()

    private initTransport(email:string, pass:string){
        return mail.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: email,
                pass: pass
            } 
        })
    }

    private initEmailOptoion(email:string, to:string[], cc:string[], subject:string, body:string){
        return  {
            from: email,                
            to: to,
            cc: cc,        
            subject: subject,            
            html: body
        }
    }

    public async getEmailInfoByUserId(user:string, isValidateRequired:boolean){
        return await this.emailDao.findEmailInfoByUserId(user, isValidateRequired)
    }
   
    public async sendEmail(req:Request, res:Response){
        try{
            let body = req.body
            let emailGenerator = new EmailTemplate(body.lastDay, body.today, body.nextDay)
            let userModel = plainToClass(UserModel, await new UserService().validateUserId(body.user, false))
            let emailSubject = emailGenerator.generateEmailSubject(userModel.firstname, userModel.lastname, userModel.nickName)
            let content = await emailGenerator.generateContent()
            let emailInfo = plainToClass(EmailModel, await this.emailDao.findEmailInfoByUserId(body.user, true))
            await this.validateEmailInfo(emailInfo);
            let mailOption = this.initEmailOptoion(emailInfo.email, emailInfo.to, emailInfo.cc, emailSubject, content)
            let sender = this.initTransport(emailInfo.email, emailInfo.password);
            sender.sendMail(mailOption,(err,info)=>{
                if(err){
                    console.log('Failed..' + err)
                    res.send(new ResponseEmailModel('0005','ERROR', err.message))
                }else{
                    let emails = this.addAllEmailsToArray(emailGenerator)
                    let response:TaskModel[] = new Array()
                    if(emails!=null){
                        response = this.generateResponse(emails)
                        let result = this.removeDuplicate(emails)
                        console.log(result)
                        this.taskService.updateTask(result)
                    }
                    console.log('Success..'+ info)
                    res.send(new ResponseEmailModel('0000','SUCCESS', response))
                }
            })
        }catch(e){
            console.log('Exception occur ' + e)
            res.send(new ResponseCommon('0002', String(e)))
        }
        return res
    }

    public async initEmail(req:Request, res:Response){
        try{
            let emailDao = new EmailDao()
            let isUservalid = await new UserService().validateUserId(req.body.user, true)
            if(isUservalid==BeConstant.NOT_FOUND) throw 'Invalid username'
            await emailDao.saveEmailPassword(req.body)
            res.send(new ResponseEmailModel('0000','SUCCESS', req.body))
        }catch(e){
            console.log('Exception occur ==>> ' + e)
            res.send(new ResponseEmailModel('0001', e, ''))
        }
        return res
    }

    private async validateEmailInfo(emailInfo:EmailModel){
        if(StringUtils.isNull(emailInfo.email)){
            throw 'Please set email on setting screen'
        }else if(emailInfo.cc === undefined || emailInfo.cc.length === 0){
            throw 'Please set Carbon Copy (CC) on setting screen'
        }else if(StringUtils.isNull(emailInfo.password)){
            throw 'Please set Email\'s password on setting screen'
        }else if(emailInfo.to === undefined || emailInfo.to.length === 0){
            throw 'Please set Destination Email (To) on setting screen'
        }
        return 'pass'
    }

    private removeDuplicate(emails:TaskModel[]){
        let result:TaskModel[] = new Array()
        let uniuq = new Map<number,TaskModel>();
        emails.forEach(e=>{
            if(e.taskProgress!='0'){
                if(uniuq.get(e.taskId)==null){
                    uniuq.set(e.taskId, e)
                }else{
                    let email = uniuq.get(e.taskId)
                    if(email!=null && email.taskProgress < e.taskProgress){
                        uniuq.set(e.taskId, e)
                    }
                }
            }
        })
        uniuq.forEach(e=>{
            result.push(e)
        })
        return result
    }

    private addAllEmailsToArray(emails:EmailTemplate){
        let allEmail:TaskModel[] = new Array() 
        if(emails.lastDay!=null){
            this.allAllArray(emails.lastDay, allEmail)
            this.allAllArray(emails.today, allEmail)
            this.allAllArray(emails.nextDay, allEmail)
            return allEmail
        }else if(emails.today!=null){
            this.allAllArray(emails.today, allEmail)
            this.allAllArray(emails.nextDay, allEmail)
            return allEmail
        }else if(emails.nextDay!=null){
            this.allAllArray(emails.nextDay, allEmail)
            return allEmail
        }else{
            return null
        }
    }

    private async allAllArray(tasks:TaskModel[], allEmail:TaskModel[]){
        tasks.forEach(e=>{
            allEmail.push(e)
        })
    }

    private generateResponse(allEmail:TaskModel[]){
        let result:TaskModel[] = new Array()
        allEmail.forEach(e=>{
            if(e.taskProgress!='100'){
                result.push(e)
            }
        })
        return result
    }
}