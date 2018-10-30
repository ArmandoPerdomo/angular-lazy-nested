import { Routes } from "@angular/router";
import { ConfiguracionDashboardComponent } from "./configuracion-dashboard/configuracion-dashboard.component";

const routes: Routes = [
    { 
        path: 'dashboard', 
        component: ConfiguracionDashboardComponent
    },
    //{ path: 'children-module', loadChildren: () => ChildrenModule }
]
export const CONFIGURACION_ROUTES = routes;