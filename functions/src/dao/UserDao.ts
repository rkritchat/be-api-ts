import * as admin from '../utils/DatabaseUtils'
import { BeConstant } from '../constant/BeConstant'
import { UserModel } from '../model/user/data/UserModel';
import { ExceptionConstant } from '../constant/ExceptionConstant'
import * as key from 'crypto-js'

export class UserDao {
    
    public async save(userInfo: UserModel){
        try{
            console.log("====create user=====")
            await admin.database().ref("/users").child(key.SHA256(userInfo.user).toString()).set(userInfo)
        }catch(e){
            console.log('Exception occur while inser data' + e)
            throw ExceptionConstant.SYSTEM_ERROR_PLX_TRY_AGN
        }
    }

    public async validateUser(userInfo: string, isValidateOnly:boolean){
        console.log("====validate user======")
        return new Promise((reslove, reject)=>{
            admin.database().ref("/users").child(key.SHA256(userInfo).toString()).on("value",(snapshot)=>{
            if(snapshot!=null && snapshot.val()!=null){
                reslove(isValidateOnly? BeConstant.FOUND:snapshot.val())
                console.log("====FOUND======")
            }else{
                console.log("====NOT FOUND======")
                reslove(BeConstant.NOT_FOUND)
            }
        })});
    }

    public async fetchUserDetail(user:string){
        console.log("==== validateUserAndPwd ======")
        return new Promise((reslove,reject)=>{
            admin.database().ref("/users").child(key.SHA256(user).toString()).on("value",(snapshot)=>{
                if(snapshot!=null && snapshot.val()!=null){
                    reslove(snapshot.val())
                }else{
                    admin.database().ref("/users").child(key.SHA256(user).toString()).set(new UserModel('','','','',user, ''))
                }
            })
        })

    }
}