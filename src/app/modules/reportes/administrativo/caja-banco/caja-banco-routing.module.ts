import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovimientoFormatoDigitalComponent } from './movimiento-banco/movimiento-formato-digital/movimiento-formato-formulario/movimiento-formato-digital.component';
import { MovimientoFormatoTablaComponent } from './movimiento-banco/movimiento-formato-digital/movimiento-formato-tabla/movimiento-formato-tabla.component';
import { MovimientoNumeroTablaComponent } from './movimiento-banco/movimientos-banco/movimiento-numero-tabla/movimiento-numero-tabla.component';
import { OrdenesPagoComponent } from './ordenes-pago/ordenes-pago.component';
import { OrdenPagoFormatoComponent } from './ordenes-pago/orden-pago-formato/orden-pago-formato.component';
import { FlujoCajaComponent } from './flujo-caja/flujo-caja/flujo-caja.component';
import { DisponibilidadComponent } from './flujo-caja/detalle-disponibilidad/disponibilidad.component';
import { MovimientosBancoComponent } from './movimiento-banco/movimientos-banco/movimiento-numero-formulario/movimientos-banco.component';


const routes: Routes = [
  { path: 'flujo-caja', component: FlujoCajaComponent },
  { path: 'flujo-caja/detalle', component: DisponibilidadComponent },
  { path: 'movimientos-banco-numero', component: MovimientosBancoComponent },
  { path: 'movimientos-banco-numero/detalle', component: MovimientoNumeroTablaComponent },
  { path: 'movimientos-banco-formato-digital', component: MovimientoFormatoDigitalComponent },
  { path: 'movimientos-banco-formato-digital/detalle', component: MovimientoFormatoTablaComponent },
  { path: 'ordenes-pago', component: OrdenesPagoComponent },
  { path: 'ordenes-pago/detalle', component: OrdenPagoFormatoComponent },
  
];

@NgModule ({
  imports: [RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class CajaBancoRoutingModule {}
