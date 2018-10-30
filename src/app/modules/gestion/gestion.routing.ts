
import { Routes } from "@angular/router";
import { GestionDashboardComponent } from "./gestion-dashboard/gestion-dashboard.component";

const routes: Routes = [
    { 
        path: 'dashboard', 
        component: GestionDashboardComponent
    },
    { path: 'ventas', loadChildren: './gestion-ventas/gestion-ventas.module#GestionVentasModule' }
]
export const GESTION_ROUTES = routes;