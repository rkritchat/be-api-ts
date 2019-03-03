import { UserModel } from '../model/UserModel'
import { Request, Response } from 'express'
import { ResponseModel } from '../model/ResponseModel'

export class UserService{

    public async execute(req:Request, res:Response){
        console.log('come here')
        let user = new UserModel(req)
        let a = await this.valdiateRequiredField(user)
        console.log('Con hereeeee')
        return res.send(new ResponseModel("0000", "success", user))
    }

    private async valdiateRequiredField(user:UserModel){
        setTimeout(()=>{
            console.log('Test')
            return true
        }, 5000)
    }
}