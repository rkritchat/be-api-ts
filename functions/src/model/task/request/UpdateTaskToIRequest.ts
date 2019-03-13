import { TaskModel } from "../data/TaskModel";

export class UpdateTaskToIRequest{
    allTask:TaskModel[]

    constructor(allTask:TaskModel[]){
        this.allTask = allTask
    }
}