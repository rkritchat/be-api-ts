import { TaskModel } from '../TaskModel'

export class ResponseTaskModel{
    statusCode:string
    statusDesc:string
    taskModel:TaskModel

    constructor(statusCode:string, statusDesc:string, taskModel:any){
        this.statusCode = statusCode
        this.statusDesc = statusDesc
        this.taskModel = taskModel
    }
}