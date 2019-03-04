import * as exporess from 'express'
import { TaskService } from '../service/TaskService'

let route = exporess.Router()

route.put('/add', (req,res)=>{
    let task =  new TaskService(req, res);
    return task.createTask()
})

route.patch('/modify', (req,res)=>{

})

route.delete('/dellete', (req,res)=>{

})

route.post('/find', (req,res)=>{
    let task = new TaskService(req, res)
    return task.findTaskByUserId()
})

export = route