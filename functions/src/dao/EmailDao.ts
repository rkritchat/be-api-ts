import * as admin from '../utils/DatabaseUtils'
import { InitEmailRequest } from '../model/email/request/InitEmailRequest';
import { PathReferenceConstants } from '../constant/PathReferenceConstants';
import { BeConstant } from '../constant/BeConstant';

export class EmailDao{

    public async saveEmailPassword(req:InitEmailRequest){
        await admin.database().ref(PathReferenceConstants.EMAIL_INFO).child(req.user).set(req.emailModel);
    }

    public async findEmailInfoByUserId(user:string){
        console.log('=== get emailInfo ==== ')
        return new Promise((reslove,reject)=>{ 
            admin.database().ref(PathReferenceConstants.EMAIL_INFO).child(user).on("value", snapshot =>{
                if(snapshot!=null && snapshot.val()!=null){
                    console.log("FOUND")
                    reslove(snapshot.val())
                }else{
                    console.log("NOT FOUND")
                    reject(BeConstant.NOT_FOUND)
                }
        })})
    }

}