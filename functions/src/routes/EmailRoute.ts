import * as express from 'express'
import { EamilService } from '../service/EmailService'

let route = express.Router()

route.get('/send', (req,res)=>{
    return new EamilService().sendEmail(res)
})

export = route