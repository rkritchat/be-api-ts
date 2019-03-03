export class ResponseModel{
    statusCode:string
    statusDesc:string
    obj:any

    constructor(statusCode:string, statusDesc:string, obj:any){
        this.statusCode = statusCode
        this.statusDesc = statusDesc
        this.obj = obj
    }
}