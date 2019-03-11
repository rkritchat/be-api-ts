import { UserModel } from "../data/UserModel";
import { EmailModel } from "../../email/data/EmailModel";

export class ResponseUserLogin{

    statusCode:string
    statusDesc:string
    user:string
    userModel:UserModel
    emailModel:EmailModel

    constructor(statusCode:string, statusDesc:string, user:string, userModel:UserModel, emailModel:any){
        this.statusCode = statusCode
        this.statusDesc = statusDesc
        this.user = user
        this.userModel = userModel
        this.emailModel = emailModel
    }
}