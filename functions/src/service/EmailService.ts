import { Request, Response } from 'express';
import { ResponseEmailModel } from '../model/email/response/ResponseEmailModel';
import { EmailDao } from '../dao/EmailDao'
import { ExceptionConstant } from '../constant/ExceptionConstant';
import * as mail from 'nodemailer'

export class EamilService{

    emailDao = new EmailDao()

    private initTransport(email:string,pass:string){
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
            let result = await this.emailDao.findEmailInfoByUserId(req.body.user)
            let emailInfo = JSON.parse(JSON.stringify(result))
            let mailOption = this.initEmailOptoion(emailInfo.email, emailInfo.to, emailInfo.cc, 'ทดสอบส่งเมลล์', req.body.text)
            console.log(mailOption)
            let sender = this.initTransport(emailInfo.email, emailInfo.password);
            sender.sendMail(mailOption,(err,info)=>{
                if(err){
                    console.log('Failed..'+ err)
                    res.send(new ResponseEmailModel('0005','ERROR', err))
                }else{
                    console.log('Success..'+ info)
                    res.send(new ResponseEmailModel('0000','SUCCESS', info))
                }
            })
        }catch(e){
            
        }
    }

    public async initEmail(req:Request, res:Response){
        try{
            let emailDao = new EmailDao()
            await emailDao.saveEmailPassword(req.body)
            res.send(new ResponseEmailModel('0000','SUCCESS', req.body))
        }catch(e){
            console.log('Exception occur ==>> ' + e)
            res.send(new ResponseEmailModel('0001', ExceptionConstant.SYSTEM_ERROR_PLX_TRY_AGN, e))
        }
        return res
    }
}