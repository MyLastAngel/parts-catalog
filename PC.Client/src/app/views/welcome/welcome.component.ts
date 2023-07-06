import { Component } from '@angular/core';
import { HttpReaderService } from 'src/app/services/http-reader.service';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { LogService } from 'src/app/services/log.service';
import { MainComponent } from '../main/main.component';

@Component({
  selector: 'pc-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent 
{
  //#region Статические 

  public static ROUTE_PATH : string = "welcome";

  //#endregion

  //#region Публичные

  public login : string = "";
  public password : string = "";

  //#endregion


  constructor(
    private api : HttpReaderService,
    private log : LogService,
    private router: Router,
  ) 
  { 

  }

  private loginErrorHandle(code : number | null = null)
  {
    let msg = "Ошибка регистрации пользователя";
    if(code != null)
    {

    }

   /*  this.dialog.alert(msg, "error"); */
  }

  //#region Обработчики событий

  public onLogin()
  {
    this.api.login(this.login, this.password).subscribe(
    {
      next : (isOk) => 
      {
        if(!isOk)
        {
          this.loginErrorHandle();
          return;
        }

        this.router.navigateByUrl(MainComponent.ROUTE_PATH);
      },
      error : (err : Error) => 
      {
        this.log.exception(err);
        this.loginErrorHandle();
      }
    });
  }

  //#endregion

}
