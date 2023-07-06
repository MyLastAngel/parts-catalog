import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { AuthTokenService } from "./auth-token.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable, Subject, map} from "rxjs";
import { SessionErrorCodes } from "../enums/session-error-codes";

@Injectable({ providedIn: 'root' })
export class HttpReaderService
{
    //#region Публичные

    /** @summary Пользователь авторизован */
    public get IsAuthorized() : boolean
    {
        let token = this.token.get();
        return token && !this.jwt.isTokenExpired(token);
    }

    /** @summary Имя авторизованного пользователя */
    public get ActiveUserName() : string
    {
        let token = this.token.get();
        if(!token)
            return "";

        let data = this.jwt.decodeToken(token);
        return data.name;
    }
    /** @summary Логин авторизованного пользователя */
    public get ActiveUserLogin() : string
    {
        let token = this.token.get();
        if(!token)
            return "";

        let data = this.jwt.decodeToken(token);
        return data.login;
    }

    /** @summary Событие изменения состояния авторизации пользователя */
    public StateChanged : Subject<boolean> = new Subject();

    //#endregion

    //#region События

    /** @summary Событие изменения состояния сессии */
    public sessionErrorEmmit : Subject<TypeSessionError> = new Subject();

    //#endregion

    constructor(
        @Inject('BASE_URL') public baseUrl: string,
        private http: HttpClient,
        private token : AuthTokenService,
        private jwt : JwtHelperService
        ) 
    { 
    }


    /** @summary Регистрация пользователя */
    public login(login : string, password : string) : Observable<boolean>
    {
        let opt = this.createHttpOptions(null, false);
        let body = { login, password64 : btoa(password) };

        return this.http.post(`${this.baseUrl}/auth/api/login`, body, opt).pipe(
        map(( o : any) => 
        {
            this.token.set(o.token);
            this.StateChanged.next(this.IsAuthorized);

            return this.IsAuthorized;
        }));
    }
    /** @summary Отмена регистраци пользователя */
    public logout()
    {
        this.token.remove();
        this.StateChanged.next(this.IsAuthorized);
    }


    /** @summary Создает правила авторизации для http запроса */
    public createHttpOptions(params : { [key : string] : string | boolean | number } = null, withCredentials : boolean = true)
    {
        let opt : { 
        headers?: HttpHeaders; 
        params?: HttpParams;
        withCredentials?: boolean;
        } =  {
        headers : new HttpHeaders(),
        withCredentials 
        };

        opt.headers = opt.headers.append('Content-Type', 'application/json');
        opt.headers = opt.headers.append('Access-Control-Allow-Origin', [ this.baseUrl, 'http://localhost:5192', 'http://localhost:4200', 'http://localhost:5192' ]);
        opt.headers = opt.headers.append('Access-Control-Allow-Credentials', 'true');
        opt.headers = opt.headers.append('Authorization' , `Bearer ${this.token.get()}`);

        if(!!params)
        opt.params = new HttpParams().appendAll(params);

        return opt;
    }

    /** @summary Выбрасывает отформатированное исключение */
    private throwError(err : HttpErrorResponse) : never
    {
        if(err.error.code == SessionErrorCodes.SessionTimeout)
        {
            this.logout();

            /* this.cookie.delete(this.cookieName);
            this.cookie.deleteAll(); */

            this.sessionErrorEmmit.next({ code : err.error.code });
        }

        let sMessage = err.message;
        if(err.error.message)
            sMessage = err.error.message;

        throw new Error(sMessage);
    }
}

export type TypeSessionError = {
    code : SessionErrorCodes
}