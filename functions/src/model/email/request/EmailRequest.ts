import { EmailModel } from '../data/EmailModel'
export class EmailRequest {
    user:string
    emailModel:EmailModel

    constructor(user:string, emailModel:EmailModel){
        this.user = user
        this.emailModel = emailModel
    }
}