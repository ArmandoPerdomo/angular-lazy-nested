
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestionarCotizacionComponent } from './gestionar-cotizacion/gestionar-cotizacion.component';
import { GestionarDevolucionComponent } from './gestionar-devolucion/gestionar-devolucion.component';
import { GestionarPedidoComponent } from './gestionar-pedido/gestionar-pedido.component';
import { GestionarPlantillaVentaComponent } from './gestionar-plantilla-venta/gestionar-plantilla-venta.component';

const routes: Routes = [
  { path: 'cotizacion', component: GestionarCotizacionComponent },
  { path: 'devolucion', component: GestionarDevolucionComponent },
  { path: 'pedido', component: GestionarPedidoComponent },
  { path: 'plantilla-de-venta', component: GestionarPlantillaVentaComponent }
  //{ path: 'gestion-clientes', component: ??} Registrado en las permisologías
  //{ path: 'cobro', component: ??} Registrado en las permisologías
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionVentasRoutingModule { }