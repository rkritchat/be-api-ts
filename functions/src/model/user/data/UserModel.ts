
export class UserModel {
    
    firstname:string
    lastname:string
    user:string
    tell:string
    email:string
    nickName:string

    constructor(firstname:string, lastname:string, user:string, tell:string, email:string, nickname:string){
        this.firstname = firstname
        this.lastname = lastname
        this.user = user
        this.tell = tell
        this.email = email
        this.nickName = nickname
    }
}