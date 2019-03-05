import { TaskDao } from '../dao/TaskDao'
import { Request, Response } from 'express'
import { ResponseTaskModel } from '../model/task/response/ResponseTaskModel'
import { TaskModel } from '../model/task/data/TaskModel'
import { UserService } from './UserService';
import { BeConstant } from '../constant/BeConstant';
import { ExceptionConstant } from '../constant/ExceptionConstant';
import { SuccessConstants } from '../constant/SuccessConstants';

export class TaskService{

    public async createTask(req:Request, res:Response){
        let taskDap = new TaskDao(req.body)
        let userService = new UserService()
        try{
            let result = await userService.validateUserId(taskDap.taskModel.user)
            if(result === BeConstant.NOT_FOUND) throw ExceptionConstant.INVALID_USERNAME
            await taskDap.createTask()
            res.send(new ResponseTaskModel('0000', 'Add task successfully', req.body))
        }catch(e){
            res.send(new ResponseTaskModel('0001', e, req.body))
        }
        return res
    }

    public async findTaskByUserId(req:Request, res:Response){
        let taskModel = new TaskModel(0, '', req.body.user,'', '', '')
        let task = new TaskDao(taskModel)
        try{
            let result = await task.findAllTaskByUserId(req.body.user)            

            res.send(new ResponseTaskModel('0000',  SuccessConstants.INQUIRY_TASK_SUCCESSFULLY, result))
        }catch(e){
            res.send(new ResponseTaskModel('0001', e, req.body))
        }
        return res
    }

}