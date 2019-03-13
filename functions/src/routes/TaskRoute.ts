import * as exporess from 'express'
import { TaskService } from '../service/TaskService'

let route = exporess.Router()

route.put('/add', (req,res)=>{
    let task = new TaskService();
    return task.createTask(req, res)
})

route.patch('/reset', (req,res)=>{
    let task = new TaskService();
    return task.resetTask(req,res)
})

route.delete('/dellete', (req,res)=>{

})

route.post('/find', (req,res)=>{
    let task = new TaskService()
    return task.findTaskByUserId(req, res)
})

export = route