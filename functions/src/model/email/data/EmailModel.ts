
export class EmailModel{
   email:string
   password:string
   to:string[]
   cc:string[]

   constructor(email:string, password:string, to:string[], cc:string[]){
       this.email = email
       this.password = password
       this.to = to
       this.cc = cc
   }
}