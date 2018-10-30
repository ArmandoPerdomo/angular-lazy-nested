import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReciboNominaComponent } from './recibo-nomina/recibo-nomina.component';
import { ReporteDetalleReciboPagoComponent } from './reporte-detalle-recibo-pago/reporte-detalle-recibo-pago.component';

const routes: Routes = [
  { path: 'estado-cuenta', loadChildren: 'app/modules/reportes/nomina/estado-cuenta/estado-cuenta.module#EstadoCuentaModule' },
  { path: 'recibo-nomina', component: ReciboNominaComponent },
  { path: 'recibo-nomina/detalle', component: ReporteDetalleReciboPagoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NominaRoutingModule { }
