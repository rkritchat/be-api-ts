import { TaskModel } from '../model/task/data/TaskModel';
import { ExceptionConstant } from '../constant/ExceptionConstant'
import * as admin from '../utils/DatabaseUtils'
import { BeConstant } from '../constant/BeConstant';

export class TaskDao{

    public async createTask(taskModel:TaskModel){
        try{
            console.log('===Create user==== ' + taskModel.user)
            taskModel.taskId = new Date().getTime()
            taskModel.taskProgress = "0"
            await admin.database().ref("/task").child(taskModel.user).child(String(taskModel.taskId)).set(taskModel)
        }catch(e){
            console.log('Exception occur ' + e)
            throw ExceptionConstant.SYSTEM_ERROR_PLX_TRY_AGN
        }
    }

    public async updateTask(task:TaskModel){
        try{
            console.log('===Update task===')
            await admin.database().ref('/task').child(task.user).child(String(task.taskId)).update(task)
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

    public async findAllTaskByUserId(user:string, isProcessing:boolean){
        try{
            return new Promise((reslove, reject)=>{
                admin.database().ref("/task").child(user).on("value",(snapshot)=>{
                    if(snapshot!=null){
                        let result:any[] = new Array();
                        snapshot.forEach(e=>{
                            console.log(e.key)
                            if(e.val().taskProgress != 100 || !isProcessing){
                                result.push(e.val())
                            }
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