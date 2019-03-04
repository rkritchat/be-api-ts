import { UserModel } from "../UserModel";

export class ResponseUserModel{
    statusCode:string
    statusDesc:string
    userModel:UserModel

    constructor(statusCode:string, statusDesc:string, userModel:any){
        this.statusCode = statusCode
        this.statusDesc = statusDesc
        this.userModel = userModel
    }
}