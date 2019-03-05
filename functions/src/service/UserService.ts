import { UserModel } from '../model/user/data/UserModel'
import { Request, Response } from 'express'
import { ResponseUserModel } from '../model/user/response/ResponseUserModel'
import { StringUtils } from '../utils/StringUtils'
import { ExceptionConstant } from '../constant/ExceptionConstant'
import { UserDao } from '../dao/UserDao'
import { BeConstant } from '../constant/BeConstant'
import { UserLoginRequest } from '../model/user/request/UserLoginRequest';
import { plainToClass } from "class-transformer";
import { EamilService } from '../service/EmailService'
import { EmailModel } from '../model/email/data/EmailModel';
import { ResponseUserLogin } from '../model/user/response/ResponseUserLogin';
import { ResponseCommon } from '../model/common/ResponseCommon';


export class UserService{
    
    userDao = new UserDao();
    public async register(req:Request, res:Response){
        let body = req.body
        let userInfo = new UserModel(body.firstname, body.lastname, body.user, body.pwd, body.tell, body.email)
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
        return await this.userDao.validateUser(userInfo, true)
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

    public async login(req:Request, res:Response){
        try{            
            let user = new UserLoginRequest(req.body.user, req.body.pwd)
            let result = await this.userDao.validateUserAndPwd(user.user, user.pwd)
            let userModel = plainToClass(UserModel, result)
            let email = await new EamilService().getEmailInfoByUserId(user.user)
            console.log(email)
            let emailModel = plainToClass(EmailModel, email)
            userModel.pwd = ''
            emailModel.password = ''
            res.send(new ResponseUserLogin('0000','Login successfully', user.user, userModel, emailModel))
        }catch(e){
            res.send(new ResponseCommon('0001', e))
        }
        return res
    }
}