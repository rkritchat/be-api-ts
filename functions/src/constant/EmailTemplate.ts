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

    public async generateContent(){
        this.lastDayDate.setDate(this.todayDate.getDate()-1)
        this.nextDayDate.setDate(this.todayDate.getDate()+1)
        let content = ''+
            '<b>เมื่อวาน ' + this.formatDate(this.lastDayDate) +'<b><br>' +
             await this.initTaskContent(this.lastDay, 'L') + '<br><br>' +

            '<b>วันนี้ ' + this.formatDate(this.todayDate) +'<b><br>' +
             await this.initTaskContent(this.today, 'T') + '<br><br>' +

            '<b>พรุ่งนี้ ' + this.formatDate(this.nextDayDate) + '<b><br>' +
             await this.initTaskContent(this.nextDay, '') + '<br><br>'

        return content
    }

    public generateEmailSubject(firstName:string, lastname:string){
        let conent =  'แจ้งการทำงานประจำวันที่ ' + this.formatDate(this.todayDate) + ' ของ ' + firstName + ' ' + lastname
        return conent
    }

    private formatDate(date:Date){
        return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
    }

    private async initTaskContent(task:TaskModel[], tag:string){
        let prefix = tag === 'L' ? 'เสร็จ' : 'คาดว่าจะเสร็จ'
        let content = ''
        task.forEach(e=>{
            content = content +' - '+ e.taskDesc + ' ' + prefix + ' ' + e.taskProgress + '%' + '<br>'
        })
    }
}