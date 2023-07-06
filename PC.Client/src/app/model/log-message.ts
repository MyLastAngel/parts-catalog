
export class LogMessage
{
    //#region Скрытые

    private _ex : Error = null;

    //#endregion

    //#region Публичные 

    public type : "error" | "warning" | "info" = "info";
    public time : Date = new Date();
    public message : string = "";
    
    //#endregion

    constructor(ex : Error = null)
    {
        this._ex = ex;
    }

    public toString()
    {
        let sTime = this.dateToString(this.time);
        let msg =  `[${sTime} - ${this.type}] ${this.message}`;

        if(!!this._ex && !!this._ex.stack)
            msg += `\n${this._ex.stack}`;

        return msg;
    }

    /** @sumary Преобразовывает время в строку формата dd.MM.YYYY HH:mm:ss.fff*/
    public dateToString(time : Date) : string
    {
        return `${time.getDate()}.${time.getMonth() + 1}.${time.getFullYear()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}.${time.getMilliseconds()}`
    }
}