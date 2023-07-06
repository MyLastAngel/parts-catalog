import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AuthTokenService
{
    //#region Статические 

    private ACCESS_TOKEN_KEY : string = "local_store_access_key";

    //#endregion

    constructor()
    {
    }

    public get(): string 
    {
        return sessionStorage.getItem(this.ACCESS_TOKEN_KEY);
    }
    public set(token: string): void 
    {
        sessionStorage.setItem(this.ACCESS_TOKEN_KEY, token);
    }
    /** @summary Удаление токена пользователя */
    public remove()
    {
        sessionStorage.removeItem(this.ACCESS_TOKEN_KEY);
    }
}