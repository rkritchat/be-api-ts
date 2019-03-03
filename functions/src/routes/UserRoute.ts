import * as express from 'express'
import { UserService } from '../service/UserService'

let route = express.Router()

route.post('/register', (req,res)=>{
    return new UserService().execute(req,res)
})

export = route