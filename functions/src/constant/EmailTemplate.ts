import { TaskModel } from '../model/task/data/TaskModel'

export class EmailTemplate{
    
    lastDay:TaskModel[] = new Array()
    today:TaskModel[] = new Array()
    nextDay:TaskModel[] = new Array()
    todayDate:Date = new Date()
    lastDayDate:Date = new Date()
    nextDayDate:Date = new Date()

    constructor(lastDay:TaskModel[], today:TaskModel[], nextDay:TaskModel[]){
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
        this.initDate()
        let content = ''+
            '<b>เมื่อวาน ' + this.formatDate(this.lastDayDate) +'</b><br>' +
             await this.initTaskContent(this.lastDay, 'L') + '<br><br>' +

            '<b>วันนี้ ' + this.formatDate(this.todayDate) +'</b><br>' +
             await this.initTaskContent(this.today, 'T') + '<br><br>' +

            '<b>พรุ่งนี้ ' + this.formatDate(this.nextDayDate) + '</b><br>' +
             await this.initTaskContent(this.nextDay, '') + '<br><br>'

        return content
    }

    public generateEmailSubject(firstName:string, lastname:string, nickName:string){
        let conent = 'แจ้งการทำงานประจำวันที่ ' + this.formatDate(this.todayDate) + ' ของ ' + firstName + ' ' + lastname + ' ('+nickName+')'
        return conent
    }

    private formatDate(date:Date){
        return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
    }

    private async initTaskContent(task:TaskModel[], tag:string){
        let prefix = tag === 'L' ? 'เสร็จ' : 'คาดว่าจะเสร็จ'
        let content = ''
        if(task===null || task.length === 0) return ' - ว่าง ' + '<br>'
        task.forEach(e=>{
            let procressPercen = (e.taskProgress!='' && e.taskProgress!='0') ? prefix + ' ' + e.taskProgress + '%' : ' '
            content = content +' - '+ e.taskDesc + ' ' + procressPercen + '<br>'
        })
        return content
    }

    private initDate(){
        this.lastDayDate.setDate(this.todayDate.getDate()-1)
        this.nextDayDate.setDate(this.todayDate.getDate()+1)
        let tmp:string[] = this.nextDayDate.toDateString().split(" ")
        if(tmp[0] === 'Sat'){
            console.log("Tomorow is "+ tmp[0]+', then set to next two day')
            this.nextDayDate.setDate(this.nextDayDate.getDate() + 2)
        }
    }
}