import { TaskModel } from '../model/task/data/TaskModel';
import { ExceptionConstant } from '../constant/ExceptionConstant'
import * as admin from '../utils/DatabaseUtils'
import { BeConstant } from '../constant/BeConstant';

export class TaskDao{
    
    taskModel:TaskModel

    constructor(taskModel:TaskModel){
        this.taskModel = taskModel
        console.log(taskModel.taskId)
        this.taskModel.taskId = new Date().getTime()
        this.taskModel.taskProgress = "0"
    }

    public async createTask(){
        try{
            console.log(this.taskModel.user)
            await admin.database().ref("/task").child(this.taskModel.user).child(String(this.taskModel.taskId)).set(this.taskModel)  //.child(String(this.taskModel.taskId))
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
                        let result:any[] = new Array();
                        snapshot.forEach(e=>{
                            console.log(e.key)
                            result.push(e.val())
                        })
                        reslove(result)
                    }else{
                        console.log('Not found task from user: ' + user)
                        reslove(BeConstant.NOT_FOUND)
                    }
            })})
        }catch(e){
            console.log('Exception occur ' + e)
            throw ExceptionConstant.SYSTEM_ERROR_PLX_TRY_AGN
        }
    }
}