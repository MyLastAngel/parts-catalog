import { Component } from '@angular/core';
import { HttpReaderService, TypeSessionError } from '../services/http-reader.service';
import { SessionErrorCodes } from '../enums/session-error-codes';
import { Router } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent 
{

  constructor(
    private api : HttpReaderService,
    private router: Router,
  )
  {
    api.sessionErrorEmmit.subscribe( (state) => this.onSessionErrorEmmit(state) );
  }


  //#region  Обработчики событий

  private onSessionErrorEmmit(state : TypeSessionError)
  {
    switch(state.code)
    {
      case SessionErrorCodes.SessionTimeout:
      {
        this.router.navigateByUrl(WelcomeComponent.ROUTE_PATH);

        break;
      }
    }
  }
  //#endregion
}

