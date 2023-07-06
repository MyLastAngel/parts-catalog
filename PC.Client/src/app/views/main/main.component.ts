import { Component, OnInit } from '@angular/core';
import { HttpReaderService } from 'src/app/services/http-reader.service';

@Component({
  selector: 'pc-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit 
{
  //#region Статические

  public static ROUTE_PATH : string = "";

  //#endregion

  constructor(
    private api : HttpReaderService
  ) 
  { 
    
  }

  ngOnInit(): void {
  }

  //#region Обработчики событий

  public onLogout()
  {
    this.api.logout();
  }

  //#endregion
}
