import { TaskDao } from '../dao/TaskDao'
import { Request, Response } from 'express'
import { ResponseTaskModel } from '../model/response/ResponseTaskModel'
import { TaskModel } from '../model/TaskModel'
import { UserService } from './UserService';
import { BeConstant } from '../constant/BeConstant';
import { ExceptionConstant } from '../constant/ExceptionConstant';

export class TaskService{

    request:Request
    response:Response

    constructor(request:Request, response:Response){
        this.request = request
        this.response = response
    }

    public async createTask(){
        let taskDap = new TaskDao(this.request.body)
        let userService = new UserService()
        try{
            let result = await userService.validateUserId(taskDap.taskModel.user)
            if(result === BeConstant.NOT_FOUND) throw ExceptionConstant.INVALID_USERNAME
            await taskDap.createTask()
            this.response.send(new ResponseTaskModel('0000', 'Add task successfully', this.request.body))
        }catch(e){
            this.response.send(new ResponseTaskModel('0001', e, this.request.body))
        }
        return this.response
    }

    public async findTaskByUserId(){
        let taskModel = new TaskModel(0, '', this.request.body.user,'', '', '')
        let task = new TaskDao(taskModel)
        try{
            let result = await task.findAllTaskByUserId(this.request.body.user)
            this.response.send(new ResponseTaskModel('0000', 'Add task successfully', result))
        }catch(e){
            this.response.send(new ResponseTaskModel('0001', e, this.request.body))
        }
        return this.response
    }

}