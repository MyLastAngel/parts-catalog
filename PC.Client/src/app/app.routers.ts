import { Routes } from "@angular/router";
import { WelcomeComponent } from "./views/welcome/welcome.component";
import { AuthorizationGuard } from "./guards/authorization.guard";
import { MainComponent } from "./views/main/main.component";

export const appRoutes : Routes = 
[
    { 
        path : MainComponent.ROUTE_PATH ,   
        component : MainComponent, 
        runGuardsAndResolvers : "always",
        canActivate : [ AuthorizationGuard ]
    
    },
    { 
        path : WelcomeComponent.ROUTE_PATH, 
        component : WelcomeComponent 
    },
]