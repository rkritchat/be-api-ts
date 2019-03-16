import { TaskDao } from '../dao/TaskDao'
import { Request, Response } from 'express'
import { ResponseTaskModel } from '../model/task/response/ResponseTaskModel'
import { SuccessConstants } from '../constant/SuccessConstants';
import { TaskModel } from '../model/task/data/TaskModel';
import { UpdateTaskToIRequest } from '../model/task/request/UpdateTaskToIRequest';
import { ResponseCommon } from '../model/common/ResponseCommon';

export class TaskService{

    taskDao = new TaskDao()

    public async createTask(req:Request, res:Response){
        try{
            await this.taskDao.createTask(req.body)
            res.send(new ResponseTaskModel('0000', 'Add task successfully', req.body))
        }catch(e){
            console.log('Exception occur ' + e)
            res.send(new ResponseTaskModel('0001', e, req.body))
        }
        return res
    }

    public async findTaskByUserId(req:Request, res:Response){
        try{
            let result = await this.taskDao.findAllTaskByUserId(req.body.user, true)            
            res.send(new ResponseTaskModel('0000',  SuccessConstants.INQUIRY_TASK_SUCCESSFULLY, result))
        }catch(e){
            res.send(new ResponseTaskModel('0001', e, req.body))
        }
        return res
    }

    public async findTaskByUser(user:string){
        return await this.taskDao.findAllTaskByUserId(user, true)            
    }

    public async resetTask(req:Request, res:Response){
        let alltask = new UpdateTaskToIRequest(req.body.allTask)
        let updateList:TaskModel[] = new Array()
        alltask.allTask.forEach(e=>{
            if(e.taskStatus!='I'){
                e.taskStatus = 'I'
                updateList.push(e)
            }
        })
        await this.updateTask(updateList)
        res.send(new ResponseCommon('0000', SuccessConstants.UPDATE_TASK_SUCCESSFULLY))
    }

    public async updateTask(tasks:TaskModel[]){
        tasks.forEach(e=>{
             this.taskDao.updateTask(e)
        })
        return 'Success'
    }

}