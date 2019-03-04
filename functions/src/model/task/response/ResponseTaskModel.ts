import { TaskModel } from '../data/TaskModel'

export class ResponseTaskModel{
    statusCode:string
    statusDesc:string
    taskRes:TaskModel

    constructor(statusCode:string, statusDesc:string, taskRes:any){
        this.statusCode = statusCode
        this.statusDesc = statusDesc
        this.taskRes = taskRes
    }
}