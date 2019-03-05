
export class UserModel {
    
    firstname:string
    lastname:string
    user:string
    pwd:string
    tell:string
    email:string

    constructor(firstname:string, lastname:string, user:string, pwd:string, tell:string, email:string){
        this.firstname = firstname
        this.lastname = lastname
        this.user = user
        this.pwd = pwd
        this.tell = tell
        this.email = email
    }
}