import { InitEmailRequest } from "../request/InitEmailRequest";

export class ResponseEmailModel{
    statusCode:string
    statusDesc:string
    emailRes:InitEmailRequest

    constructor(statusCode:string, statusDesc:string, emailRes:any){
        this.statusCode = statusCode
        this.statusDesc = statusDesc
        this.emailRes = emailRes
    }
}