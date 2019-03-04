import { UserModel } from '../model/user/data/UserModel'
import { Request, Response } from 'express'
import { ResponseUserModel } from '../model/user/response/ResponseUserModel'
import { StringUtils } from '../utils/StringUtils'
import { ExceptionConstant } from '../constant/ExceptionConstant'
import { UserDao } from '../dao/UserDao'
import { BeConstant } from '../constant/BeConstant'

export class UserService{
    
    userDao = new UserDao();
    public async execute(req:Request, res:Response){
        let userInfo = new UserModel(req)
        try{
            console.log(userInfo)
            await this.valdiateRequiredField(userInfo)
            if(await this.validateUserId(userInfo.user) === BeConstant.FOUND)throw ExceptionConstant.USERNAME_IS_ALREADY_EXSIT
            await this.userDao.createUser(userInfo)
            res.send(new ResponseUserModel("0000", "Create user successfully", userInfo))
        }catch(e){
            console.log(e)
            res.send(new ResponseUserModel("0001", e, userInfo))
        }
        return res
    }

    public async validateUserId(userInfo:string){
        return await this.userDao.validateUser(userInfo)
    }

    private async valdiateRequiredField(userInfo:UserModel){
        return new Promise((reslove, reject)=>{ 
            if(StringUtils.isNull(userInfo.firstname)){
                reject(ExceptionConstant.FIRST_NAME_IS_REQURIED)
            }else if(StringUtils.isNull(userInfo.lastname)){
                reject(ExceptionConstant.LAST_NAME_IS_REQURIED)
            }else if(StringUtils.isNull(userInfo.user)){
                reject(ExceptionConstant.USERNAME_IS_REQURIED)
            }else if(StringUtils.isNull(userInfo.pwd)){
                reject(ExceptionConstant.PASSWORD_IS_REQURIED)
            }else if(StringUtils.isNull(userInfo.email)){
                reject(ExceptionConstant.EMAIL_IS_REQURIED)
            }else if(StringUtils.isNull(userInfo.tell)){
                reject(ExceptionConstant.MOBILE_NO_IS_REQURIED)
            }else{
                reslove('pass')
            }
        })
    }
}