import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { appRoutes } from './app.routers';
import { RouterModule } from '@angular/router';

import {JwtModule, JWT_OPTIONS} from '@auth0/angular-jwt';
import { BASE_URL_INJECTION_TOKEN } from './app.tokens';

import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';

import { AuthTokenService } from './services/auth-token.service';
import { HttpReaderService } from './services/http-reader.service';

import { AuthorizationGuard } from './guards/authorization.guard';
import { ComponentDeactivationGuard } from './guards/component-deactivation.guard';

import { AppComponent } from './views/app.component';
import { WelcomeComponent } from './views/welcome/welcome.component';
import { LogService } from './services/log.service';
import { MainComponent } from './views/main/main.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,

    MatButtonModule,
    MatDialogModule,
    MatInputModule,

    RouterModule.forRoot(appRoutes),
    JwtModule.forRoot({
      jwtOptionsProvider : 
      {
        provide : JWT_OPTIONS,
        useFactory : getJwtFactory,
        deps : [ BASE_URL_INJECTION_TOKEN, AuthTokenService  ]
      }
    }),
  ],
  providers: 
  [
    { provide: 'BASE_URL', useFactory : getBaseUrl },
    { provide: BASE_URL_INJECTION_TOKEN, useFactory: getBaseUrl },

    HttpReaderService,
    AuthTokenService,
    LogService,

    AuthorizationGuard,
    ComponentDeactivationGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


export function getJwtFactory(url : string, token : AuthTokenService)
{
  return {
    tokenGetter : ()=> token.get(),
    allowedDomains : [ url ]
  };
}
export function getBaseUrl() 
{
  let href = "https://localhost:7006";

  if(environment.production)
    href = document.getElementsByTagName('base')[0].href;
    
  if(href.endsWith('/'))
    href = href.slice(0, href.length - 1);

  return href;
}