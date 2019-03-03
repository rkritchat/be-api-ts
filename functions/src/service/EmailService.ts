import * as mail from 'nodemailer'
import { ResponseModel } from '../model/ResponseModel'
import { Response } from 'express';

export class EamilService{

    private mailOptions = {
        from: 'kritchat.r@gmail.com',                // sender
        to: 'rkritchat@gmail.com',                // list of receivers
        subject: 'Hello from sender',              // Mail subject
        html: '<b>Do you receive this mail?</b>'   // HTML body
    }

    private transport = mail.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'kritchat.r@gmail.com',
            pass: 'tdjfK@66'
        } 
      })

      public sendEmail(response:Response){
        this.transport.sendMail(this.mailOptions,(err,info)=>{
            if(err){
                console.log('Failed..'+ err)
                response.send(new ResponseModel('0001','ERROR', err))
            }else{
                console.log('Success..'+ info)
                response.send(new ResponseModel('0000','SUCCESS', info))
            }
        })
      }
}