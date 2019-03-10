import * as express from 'express'
import { UserService } from '../service/UserService'

let route = express.Router()

route.post('/register', (req,res)=>{
    return new UserService().register(req,res)
})

route.post('/login', (req,res)=>{
    return new UserService().login(req,res) 
})

route.patch('/init', (req,res)=>{
    return new UserService().updateUserInfo(req,res) 
})

export = route