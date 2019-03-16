import * as admin from '../utils/DatabaseUtils'
import { InitEmailRequest } from '../model/email/request/InitEmailRequest'
import { PathReferenceConstants } from '../constant/PathReferenceConstants'
import { ExceptionConstant } from '../constant/ExceptionConstant'
import { EmailModel } from '../model/email/data/EmailModel'
import * as key from 'crypto-js'

export class EmailDao{

    public async updateEmailInfo(req:InitEmailRequest){
        await admin.database().ref(PathReferenceConstants.EMAIL_INFO).child(key.SHA256(req.user).toString()).set(req.emailModel);
    }

    public async findEmailInfoByUserId(user:string, isValidateRequired:boolean){
        console.log('=== get emailInfo ==== ')
        let encrypUser:string = key.SHA256(user).toString()
        console.log(encrypUser)
        return new Promise((reslove,reject)=>{ 
            admin.database().ref(PathReferenceConstants.EMAIL_INFO).child(encrypUser).on("value", snapshot =>{
                if(snapshot!=null && snapshot.val()!=null){
                    console.log("FOUND")
                    reslove(snapshot.val())
                }else{
                    console.log("NOT FOUND")
                    if(isValidateRequired){
                        reject(ExceptionConstant.EMAIL_INFO_NOT_FOUND)
                    }else{
                        reslove('')
                    }
                    admin.database().ref(PathReferenceConstants.EMAIL_INFO).child(encrypUser).set(new EmailModel(user, new Array(), new Array()));
                }
        })})
    }

}