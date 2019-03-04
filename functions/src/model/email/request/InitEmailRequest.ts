import { EmailModel } from '../data/EmailModel'
export class InitEmailRequest {
    user:string
    emailModel:EmailModel

    constructor(user:string, emailModel:EmailModel){
        this.user = user
        this.emailModel = emailModel
    }
}