import * as admin from '../utils/DatabaseUtils'
import { InitEmailRequest } from '../model/email/request/InitEmailRequest';
import { PathReferenceConstants } from '../constant/PathReferenceConstants';
import { BeConstant } from '../constant/BeConstant';

export class EmailDao{

    public async saveEmailPassword(req:InitEmailRequest){
        await admin.database().ref(PathReferenceConstants.EMAIL_INFO).child(req.user).set(req.emailModel);
    }

    public async findEmailInfoByUserId(user:string){
        return new Promise((reslove,reject)=>{ 
            admin.database().ref(PathReferenceConstants.EMAIL_INFO).child(user).on("value", snapshot =>{
                if(snapshot==null){
                    reject(BeConstant.NOT_FOUND)
                }else{
                    reslove(snapshot.val())
                }
        })})
    }

}