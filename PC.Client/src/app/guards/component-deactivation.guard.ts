import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";

export interface IComponentDeactivate
{
    canDeactivate: () => Promise<boolean>;
}

@Injectable({ providedIn : "root" })
export class ComponentDeactivationGuard implements CanDeactivate<IComponentDeactivate>
{
    public async canDeactivate(component : IComponentDeactivate): Promise<boolean> 
    { 
        return new Promise<boolean>( async resolver =>
            {
                if(!component.canDeactivate)
                {
                    resolver(true);
                    return;
                }

                await component.canDeactivate().then( isOk => {
                    resolver(isOk);
                })
            });
      
    }
}