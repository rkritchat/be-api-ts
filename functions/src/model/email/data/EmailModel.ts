
export class EmailModel{
    
   email:string
   to:string[]
   cc:string[]

   constructor(email:string, to:string[], cc:string[]){
       this.email = email
       this.to = to
       this.cc = cc
   }
}