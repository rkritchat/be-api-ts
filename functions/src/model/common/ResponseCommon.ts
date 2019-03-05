export class ResponseCommon{
    statusCode:string
    statusDesc:string

    constructor(statusCode:string, statusDesc:string){
        this.statusCode = statusCode
        this.statusDesc = statusDesc
    }
}