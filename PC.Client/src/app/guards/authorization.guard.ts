import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { WelcomeComponent } from "../views/welcome/welcome.component";
import { HttpReaderService } from "../services/http-reader.service";

@Injectable({ providedIn : "root" })
export class AuthorizationGuard implements CanActivate
{
    constructor(
        private router: Router,
        private auth : HttpReaderService
    )
    {

    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean
    {
        if(this.auth.IsAuthorized)
            return true;
        
        this.router.navigateByUrl(WelcomeComponent.ROUTE_PATH);
        return false;
    }
}