import * as admin from '../utils/DatabaseUtils'
import { BeConstant } from '../constant/BeConstant'
import { UserModel } from '../model/user/data/UserModel';
import { ExceptionConstant } from '../constant/ExceptionConstant'

export class UserDao {
    
    public async save(userInfo: UserModel){
        try{
            console.log("====create user=====")
            await admin.database().ref("/users").child(userInfo.user).set(userInfo)
        }catch(e){
            console.log('Exception occur while inser data' + e)
            throw ExceptionConstant.SYSTEM_ERROR_PLX_TRY_AGN
        }
    }

    public async validateUser(userInfo: string, isValidateOnly:boolean){
        console.log("====validate user======")
        return new Promise((reslove, reject)=>{
            admin.database().ref("/users").child(userInfo).on("value",(snapshot)=>{
            if(snapshot!=null && snapshot.val()!=null){
                reslove(isValidateOnly? BeConstant.FOUND:snapshot.val())
                console.log("====FOUND======")
            }else{
                console.log("====NOT FOUND======")
                reslove(BeConstant.NOT_FOUND)
            }
        })});
    }

    public async validateUserAndPwd(user:string, pwd:string){
        console.log("==== validateUserAndPwd ======")
        return new Promise((reslove,reject)=>{
            admin.database().ref("/users").child(user).on("value",(snapshot)=>{
                if(snapshot!=null && snapshot.val()!=null){
                    if(snapshot.child('pwd').val() === pwd){
                        console.log("==== Password is match ======")
                        reslove(snapshot.val())
                    }else{
                        console.log("==== Password is mot match ======")
                        reject(ExceptionConstant.INVALID_USERNAME_OR_PASSWORD)
                    }
                }else{
                    reject(ExceptionConstant.INVALID_USERNAME_OR_PASSWORD)
                }
            })
        })

    }
}