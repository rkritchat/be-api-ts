import { UserModel } from '../model/UserModel'
import { Request, Response } from 'express'
import { ResponseModel } from '../model/ResponseModel'
import { StringUtils } from '../utils/StringUtils'
import { ExceptionConstant } from '../constant/ExceptionConstant'
import { UserDao } from '../dao/UserDao'

export class UserService{

    public async execute(req:Request, res:Response){
        console.log('come 333333')
        let userInfo = new UserModel(req)
        try{
            console.log(userInfo)
            await this.valdiateRequiredField(userInfo)
            let userDao = new UserDao();
            await userDao.validateUser(userInfo)
            await userDao.createUser(userInfo)
            res.send(new ResponseModel("0000", "success", userInfo))
        }catch(e){
            console.log(e)
            res.send(new ResponseModel("001", e, userInfo))
        }
        return res
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