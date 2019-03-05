import { TaskModel } from "../../task/data/TaskModel";

export class SendEmailRequest{
    user:string
    today:TaskModel[] = new Array()
    lastDay:TaskModel[] = new Array()
    nextDay:TaskModel[] = new Array()

    constructor(user:string, today:TaskModel[], lastDay:TaskModel[], nextDay:TaskModel[]){
        this.user = user
        this.today = today
        this.lastDay = lastDay
        this.nextDay = nextDay
    }
}