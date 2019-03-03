import * as admin from 'firebase-admin'
import { BeConstant } from '../constant/BeConstant'
import { UserModel } from '../model/UserModel';

admin.initializeApp(BeConstant.DATABASE_CONFIG)

export class UserDao {
    
    public async createUser(userInfo: UserModel){
        try{
            console.log("====create user=====")
            await admin.database().ref("/users").child(userInfo.user).set(userInfo)
        }catch(e){
            console.log('Exception occur while inser data' + e)
            throw 'System error please try again later'
        }
    }

    public async validateUser(userInfo: UserModel){
        console.log("====validate user======")
        return new Promise((reslove, reject)=>{
            admin.database().ref("/users").child(userInfo.user).on("value",(snapshot)=>{
            if(snapshot!=null && snapshot.val()!=null){
                reject('Username is already exist.')
            }else{
                reslove('pass')
            }
        })});
    }
}