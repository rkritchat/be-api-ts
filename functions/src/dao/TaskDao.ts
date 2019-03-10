import { TaskModel } from '../model/task/data/TaskModel';
import { ExceptionConstant } from '../constant/ExceptionConstant'
import * as admin from '../utils/DatabaseUtils'
import { BeConstant } from '../constant/BeConstant';
import { StringUtils } from '../utils/StringUtils';

export class TaskDao{

    public async createTask(taskModel:TaskModel){
        try{
            console.log('===Create task for user==== ' + taskModel.user)
            let todayDate = new Date()
            taskModel.taskId = todayDate.getTime()
            taskModel.taskProgress = "0"
            taskModel.updateDate = StringUtils.formatDateToString(todayDate)
            console.log(taskModel.updateDate)
            await admin.database().ref("/task").child(taskModel.user).child(String(taskModel.taskId)).set(taskModel)
        }catch(e){
            console.log('Exception occur ' + e)
            throw ExceptionConstant.SYSTEM_ERROR_PLX_TRY_AGN
        }
    }

    public async updateTask(taskModel:TaskModel){
        try{
            console.log('===Update task===')
            taskModel.updateDate = StringUtils.formatDateToString(new Date())
            await admin.database().ref('/task').child(taskModel.user).child(String(taskModel.taskId)).update(taskModel)
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