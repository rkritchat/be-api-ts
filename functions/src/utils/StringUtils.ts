
export class StringUtils{

    public static isNull(txt:string):boolean{
        return txt==null || (txt!=null && txt.trim().length==0)
    }

    public static formatDateToString(date:Date){
        return date.getDate() + '/' + this.formatMonth(date) + '/' + date.getFullYear()
    }

    private static formatMonth(date:Date){
        let month = date.getMonth() + 1
        return  month < 10 ? '0'+month : month
    }
    
}