import { UserModel } from "../data/UserModel";

export class ResponseUserModel{
    statusCode:string
    statusDesc:string
    userRes:UserModel

    constructor(statusCode:string, statusDesc:string, userRes:any){
        this.statusCode = statusCode
        this.statusDesc = statusDesc
        this.userRes = userRes
    }
}