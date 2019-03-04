import { TaskModel } from '../model/task/data/TaskModel';
import { ExceptionConstant } from '../constant/ExceptionConstant'
import * as admin from '../utils/DatabaseUtils'

export class TaskDao{
    
    taskModel:TaskModel

    constructor(taskModel:TaskModel){
        this.taskModel = taskModel
        this.taskModel.taskId = new Date().getTime()
        this.taskModel.taskProgress = "0"
    }

    public async createTask(){
        try{
            console.log(this.taskModel.user)
            await admin.database().ref("/task").child(this.taskModel.user).child(String(this.taskModel.taskId)).set(this.taskModel)
        }catch(e){
            console.log('Exception occur ' + e)
            throw ExceptionConstant.SYSTEM_ERROR_PLX_TRY_AGN
        }
    }

    public async updateTask(){
        try{

        }catch(e){
            console.log('Exception occur ' + e)
            throw ExceptionConstant.SYSTEM_ERROR_PLX_TRY_AGN
        }
    }

    public async deleteTask(){
        try{
        }catch(e){
            console.log('Exception occur ' + e)
            throw ExceptionConstant.SYSTEM_ERROR_PLX_TRY_AGN
        }
    }

    public async findAllTaskByUserId(user:string){
        try{
            return new Promise((reslove, reject)=>{
                admin.database().ref("/task").child(user).on("value",(snapshot)=>{
                    if(snapshot!=null){
                        reslove(snapshot.val())
                    }else{
                        reslove('Not found')
                    }
            })})
        }catch(e){
            console.log('Exception occur ' + e)
            throw ExceptionConstant.SYSTEM_ERROR_PLX_TRY_AGN
        }
    }
}