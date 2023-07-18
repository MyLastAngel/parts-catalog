import { Component } from '@angular/core';
import { HttpReaderService } from '../services/http-reader.service';
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
    api.authorizeChanged.subscribe((isAut : boolean) => 
    {
      if(!isAut)
        this.redirectToLogon();
    });
  }

  private redirectToLogon()
  {
    this.router.navigateByUrl(WelcomeComponent.ROUTE_PATH);
  }

  //#region  Обработчики событий
  //#endregion
}

