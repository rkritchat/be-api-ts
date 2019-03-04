import * as express from 'express'
import { EamilService } from '../service/EmailService'

let route = express.Router()

route.post('/send', (req,res)=>{
    let emailService = new EamilService()
    return emailService.sendEmail(req, res)
})

/*
 * This route for init email's password, 
 * Required this because next time when sending email
 * System will user this infomation for send email
*/
route.post('/init', (req,res) =>{
    let emailService = new EamilService()
    return emailService.initEmail(req, res)
})

export = route