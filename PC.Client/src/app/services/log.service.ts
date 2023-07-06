import { Injectable } from "@angular/core";
import { LogMessage } from "../model/log-message";

@Injectable({ providedIn : "root"})
export class LogService
{
    //#region Скрытые

    private static DESIGNER_MESSAGES_MAX = 200;

    private _messages : Array<LogMessage> = [];

    //#endregion

    //#region Публичные 

    public get messages() : Array<LogMessage>
    {
        return this._messages;
    }

    //#endregion

    constructor()
    {

    }

    public error(message : string)
    {
        this.logCore("error", message);
    }
    public exception(ex : Error)
    {
        this.logCore("error", ex.message, ex);
    }
    public log(message : string)
    {
        this.logCore("info", message);
    }
    public warning(message : string)
    {
        this.logCore("warning", message);
    }

    public custom(msg : LogMessage)
    {
        this.checkSize();
        this._messages.push(msg);
    }

    private logCore(type : "error" | "warning" | "info", message : string, ex : Error = null)
    {
        this.checkSize();
        
        let msg : LogMessage = new LogMessage(ex);
        msg.type = type;
        msg.message = message;

        this._messages.splice(0, 0, msg);
    }

    private checkSize()
    {
        if(this._messages.length >= LogService.DESIGNER_MESSAGES_MAX)
            this._messages.splice(this._messages.length - 1 , 1);  
    }
}
