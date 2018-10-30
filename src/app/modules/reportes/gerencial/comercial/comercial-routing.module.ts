/**
 * Created by armando.perdomo on 30/07/2018.
 */
import { RouterModule, Routes} from '@angular/router';
import { NgModule} from '@angular/core';
import { ReporteComprasComponent } from './reporte-compras/reporte-compras.component';
import { ReporteVentasComponent } from './reporte-ventas/reporte-ventas.component';
import { TodosComercialComponent } from './todos-comercial/todos-comercial.component';

const routes: Routes = [
  {path: 'compras', component: ReporteComprasComponent},
  {path: 'ventas', component: ReporteVentasComponent},
  {path: 'todos', component: TodosComercialComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ComercialRoutingModule {}
