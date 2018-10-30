import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioDashboardComponent } from './modules/inicio/inicio-dashboard/inicio-dashboard.component';
import { HomeComponent } from './modules/compartidos/home/home.component';
import { LoginComponent } from './modules/public/login/login.component';
import { CTAuthGuard } from './core/services/auth-guard.service';
import { CTPermisionsGuard } from './core/services/permissions-guard.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  { 
    path: 'app', 
    component: HomeComponent,
    canActivate: [CTAuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'inicio' 
      },
      {
        path: 'inicio',
        component: InicioDashboardComponent
      },
      { 
        path: 'reportes', 
        canActivateChild: [CTPermisionsGuard],
        loadChildren: './modules/reportes/reportes.module#ReportesModule'
      },
      {
        path: 'gestion',
        canActivateChild: [CTPermisionsGuard],
        loadChildren: './modules/gestion/gestion.module#GestionModule'
      },
      {
        path: 'configuraciones',
        loadChildren: './modules/configuracion/configuracion.module#ConfiguracionModule'
      }
    ] 
  },
  { path: '**', pathMatch: 'full', redirectTo: '/app/inicio'},
  { path: '', pathMatch: 'full', redirectTo: '/app/inicio'}
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
