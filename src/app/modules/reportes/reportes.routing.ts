import { Routes } from "@angular/router";
import { ReportesDashboardComponent } from "./reportes-dashboard/reportes-dashboard.component";

const routes: Routes = [
    { 
        path: 'dashboard', 
        component: ReportesDashboardComponent
    },
    { path: 'administrativos', loadChildren: './administrativo/administrativo.module#AdministrativoModule' },
    { path: 'contables', loadChildren: './contable/contable.module#ContableModule' },
    { path: 'nomina', loadChildren: './nomina/nomina.module#NominaModule' },
    { path: 'gerenciales', loadChildren: './gerencial/gerencial.module#GerencialModule' }
]
export const REPORTES_ROUTES = routes;