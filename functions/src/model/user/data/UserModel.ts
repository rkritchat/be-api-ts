import { Request }from 'express' 

export class UserModel {
    
    firstname:string
    lastname:string
    user:string
    pwd:string
    tell:string
    email:string

    constructor(req: Request){
        this.firstname = req.body.firstname
        this.lastname = req.body.lastname
        this.user = req.body.user
        this.pwd = req.body.pwd
        this.tell = req.body.tell
        this.email = req.body.email
    }
}