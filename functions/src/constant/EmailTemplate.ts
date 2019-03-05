import { TaskModel } from "../model/task/data/TaskModel";

export class EmailTemplate{
    
    lastDay:TaskModel[] = new Array()
    today:TaskModel[] = new Array()
    nextDay:TaskModel[] = new Array()
    todayDate:Date = new Date()
    lastDayDate:Date = new Date()
    nextDayDate:Date = new Date()


    constructor(today:TaskModel[], lastDay:TaskModel[], nextDay:TaskModel[]){
        console.log('TODAY')
        console.log(today)
        console.log('LASTDAY')
        console.log(lastDay)
        console.log('NEXTDAY')
        console.log(nextDay)

        this.lastDay = lastDay
        this.today = today
        this.nextDay = nextDay
    }

    public generateContent(){
        this.lastDayDate.setDate(this.todayDate.getDate()-1)
        this.nextDayDate.setDate(this.todayDate.getDate()+1)
        let content = ''+
            'เมื่อวาน ' + this.formatDate(this.lastDayDate) +'<br>' +
            + this.initTaskContent(this.lastDay) + '<br><br>' +

            'วันนี้ ' + this.formatDate(this.todayDate) +'<br>' +
            + this.initTaskContent(this.today) + '<br><br>' +

            'พรุ่งนี้ ' + this.formatDate(this.nextDayDate) + '<br>' +
            + this.initTaskContent(this.nextDay) + '<br><br>'
        return content
    }

    public generateEmailSubject(firstName:string, lastname:string){

        let conent =  'แจ้งการทำงานประจำวันที่ ' + this.formatDate(this.todayDate) + ' ของ ' + firstName + ' ' + lastname
        return conent
    }

    private formatDate(date:Date){
        return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
    }

    private initTaskContent(task:TaskModel[]){
        let content = ''

        task.forEach(e=>{
            content = content +' - '+ e.taskDesc + '<br>'
            console.log('Task is ' + e.taskDesc)
        })
        return content
    }
}