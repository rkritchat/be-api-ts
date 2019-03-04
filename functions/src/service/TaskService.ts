import { TaskDao } from '../dao/TaskDao'
import { Request, Response } from 'express'
import { ResponseModel } from '../model/ResponseModel'
import { TaskModel } from '../model/TaskModel'

export class TaskService{

    request:Request
    response:Response

    constructor(request:Request, response:Response){
        this.request = request
        this.response = response
    }

    public async createTask(){
        let task = new TaskDao(this.request.body)
        try{
            //TODO add validate user id
            await task.createTask()
            this.response.send(new ResponseModel('0000', 'Add task successfully', this.request.body))
        }catch(e){
            this.response.send(new ResponseModel('0001', e, this.request.body))
        }
        return this.response
    }

    public async findTaskByUserId(){
        let taskModel = new TaskModel(0, '', this.request.body.user,'', '', '')
        let task = new TaskDao(taskModel)
        try{
            let result = await task.findAllTaskByUserId(this.request.body.user)
            this.response.send(new ResponseModel('0000', 'Add task successfully', result))
        }catch(e){
            this.response.send(new ResponseModel('0001', e, this.request.body))
        }
        return this.response
    }
}