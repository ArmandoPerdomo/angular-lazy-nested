import { Injectable } from '@angular/core';
import { CanActivateChild, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccessRoutesService } from './access-routes.service';
import { AccessRoutes } from '../../abstract/class/accessRoutes';
import { UIComponentsService } from './ui-components.service';

@Injectable()
export class CTPermisionsGuard implements CanActivateChild {

    constructor(
        private accessRoutesService: AccessRoutesService, 
        private router:Router,
        private ui: UIComponentsService
    ){}

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ) : Observable<boolean>|Promise<boolean>|boolean{
        
        const accessRoutes: AccessRoutes[] = this.accessRoutesService.getAllAccessOnlyDetail();

        if(!accessRoutes || !accessRoutes.length){
            this.enrouteToLogin();
            return false;
        }

        if(state.url.includes("gestion") && !this.accessRoutesService.hasGestionAccess()){
            this.enrouteToLogin();
            return false;
        }

        if(state.url.includes("reportes") && !this.accessRoutesService.hasReportesAccess()){
            this.enrouteToLogin();
            return false;
        }

        if(!state.url.includes("dashboard")){
            this.checkAccess(state);
        }

        console.log('is active',{state: state});
        return true;
    }

    enrouteToLogin(): void{
        this.ui.showSnackNotification(
            "No tienes accesso permitido a esta sección/módulo, serás redireccionado para iniciar sesión de nuevo",
            "OK",
            10000
        );
        this.router.navigate(['/login']);
    }

    checkAccess(state: RouterStateSnapshot): boolean{

        const hasAccessAt = this.accessRoutesService.getAllAccessOnlyDetail()
        .find((el) => state.url.includes(el.path));

        console.log('has accessat',hasAccessAt);

        if(!hasAccessAt){
            return false;
        }

        return true;

        
    }
}