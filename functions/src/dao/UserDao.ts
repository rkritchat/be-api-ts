import * as admin from '../utils/DatabaseUtils'
import { BeConstant } from '../constant/BeConstant'
import { UserModel } from '../model/UserModel';
import { ExceptionConstant } from '../constant/ExceptionConstant'

export class UserDao {
    
    public async createUser(userInfo: UserModel){
        try{
            console.log("====create user=====")
            await admin.database().ref("/users").child(userInfo.user).set(userInfo)
        }catch(e){
            console.log('Exception occur while inser data' + e)
            throw ExceptionConstant.SYSTEM_ERROR_PLX_TRY_AGN
        }
    }

    public async validateUser(userInfo: string){
        console.log("====validate user======")
        return new Promise((reslove, reject)=>{
            admin.database().ref("/users").child(userInfo).on("value",(snapshot)=>{
            if(snapshot!=null && snapshot.val()!=null){
                reslove(BeConstant.FOUND)
            }else{
                reslove(BeConstant.NOT_FOUND)
            }
        })});
    }
}