import { EmailModel } from "../../email/data/EmailModel";
import { UserModel } from "../data/UserModel";

export class ResponseUserLogin{

    statusCode:string
    statusDesc:string
    user:string
    taskModel:any
    emailModel:EmailModel
    userModel:UserModel

    constructor(statusCode:string, statusDesc:string, user:string, taskModel:any, emailModel:any, userModel:UserModel){
        this.statusCode = statusCode
        this.statusDesc = statusDesc
        this.user = user
        this.taskModel = taskModel
        this.emailModel = emailModel
        this.userModel = userModel
    }
}