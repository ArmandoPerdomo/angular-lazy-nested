import { Injectable } from '@angular/core';
import { AccessRoutes, AccessRouteParent } from '../../abstract/class/accessRoutes';
import { ModulesCT } from '../../abstract/enums/modules.enum';

@Injectable()
export class AccessRoutesService {

    accessRoutes: Array<AccessRoutes>;
    constructor(){
        this.update();
    }

    update(): void{
        this.accessRoutes = JSON.parse(localStorage.getItem('access_routes'));
    }

    getAllAccess(): Array<AccessRoutes>{
        this.update();
        return this.accessRoutes;
    }

    getAllAccessOnlyDetail(): Array<AccessRoutes>{
        this.update();
        return this.accessRoutes.filter((val)=> val.path);
    }

    getAllAccessPrent(): Array<AccessRouteParent>{
        this.update();
        let parents: Array<AccessRouteParent> = [];
        this.getAllAccessOnlyDetail().forEach((el)=> parents.push(el.padre));
        return parents;
    }

    hasGestionAccess(): boolean{
        this.update();
        let accessRoutes: Array<AccessRoutes> = this.getAllAccess()
        .filter((val) => val.modulo === ModulesCT.GESTION);

        if(!accessRoutes || !accessRoutes.length){
            return false;
        }

        return true;
    }

    hasReportesAccess(): boolean{
        this.update();
        let accessRoutes: Array<AccessRoutes> = this.getAllAccess()
        .filter((val) => val.modulo === ModulesCT.REPORTES);

        if(!accessRoutes || !accessRoutes.length){
            return false;
        }

        return true;
    }
}