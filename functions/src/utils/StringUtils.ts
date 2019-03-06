
export class StringUtils{

    public static isNull(txt:string):boolean{
        return txt==null || (txt!=null && txt.trim().length==0)
    }
    
}