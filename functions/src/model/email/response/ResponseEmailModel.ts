import { EmailRequest } from "../request/EmailRequest";

export class ResponseEmailModel{
    statusCode:string
    statusDesc:string
    emailRes:EmailRequest

    constructor(statusCode:string, statusDesc:string, emailRes:any){
        this.statusCode = statusCode
        this.statusDesc = statusDesc
        this.emailRes = emailRes
    }
}