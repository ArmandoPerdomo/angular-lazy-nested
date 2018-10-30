import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import { TodosGerencialComponent } from './todos-gerencial/todos-gerencial.component';
import { ReporteAuditoriaComponent } from './it/reporte-auditoria/reporte-auditoria.component';

const routes: Routes = [
  { path: 'administrativos', loadChildren: './administrativo/administrativo-gerencial.module#AdministrativoGerencialModule' },
  { path: 'comercial', loadChildren: './comercial/comercial-gerencial.module#ComercialGerencialModule' },
  { path: 'auditoria', component: ReporteAuditoriaComponent },
  { path: 'todos-gerencial', component: TodosGerencialComponent }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GerencialRoutingModule {}
