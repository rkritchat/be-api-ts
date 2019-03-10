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

    public async getEmailInfoByUserId(user:string){
        return await this.emailDao.findEmailInfoByUserId(user)
    }
   
    public async sendEmail(req:Request, res:Response){
        try{
            let body = req.body
            let emailGenerator = new EmailTemplate(body.lastDay, body.today, body.nextDay)
            let userModel = plainToClass(UserModel, await new UserService().validateUserId(body.user, false))
            //Geneate email subject
            let emailSubject = emailGenerator.generateEmailSubject(userModel.firstname, userModel.lastname, userModel.nickName)
            //Generate content
            let content = await emailGenerator.generateContent()
            let emailInfo = plainToClass(EmailModel, await this.emailDao.findEmailInfoByUserId(body.user))
            await this.validateEmailInfo(emailInfo);
            let mailOption = this.initEmailOptoion(emailInfo.email, emailInfo.to, emailInfo.cc, emailSubject, content)
            let sender = this.initTransport(emailInfo.email, emailInfo.password);
            sender.sendMail(mailOption,(err,info)=>{
                if(err){
                    console.log('Failed..' + err)
                    res.send(new ResponseEmailModel('0005','ERROR', err.message))
                }else{
                    this.taskService.updateTask(body.lastDay)
                    this.taskService.updateTask(body.today)
                    this.taskService.updateTask(body.nextDay)
                    console.log('Success..'+ info)
                    res.send(new ResponseEmailModel('0000','SUCCESS', info))
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
}