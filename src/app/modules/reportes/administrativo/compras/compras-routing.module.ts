import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CxpComponent } from './cxp/cxp.component';
import { ReporteDetalleCxpComponent } from './reporte-detalle-cxp/reporte-detalle-cxp.component';
import { CotizacionesAlProveedorDigitalComponent } from './cotizaciones-al-proveedor-digital/cotizaciones-al-proveedor-digital.component';
import { FacturasDeCompraDigitalComponent } from './facturas-de-compra-digital/facturas-de-compra-digital.component';
import { NotasDeRecepcionDigitalComponent } from './notas-de-recepcion-digital/notas-de-recepcion-digital.component';
import { OrdenesDeCompraDigitalComponent } from './ordenes-de-compra-digital/ordenes-de-compra-digital.component';
import { PagoDigitalComponent } from './pago-digital/pago-digital.component';
import { ReporteDetallesComponent } from './reporte-detalles/reporte-detalles.component';
import { DevolucionesAlProveedorDigitalComponent } from './devoluciones-al-proveedor-digital/devoluciones-al-proveedor-digital.component';
import { PagosPorNumeroDigitalComponent } from './pagos-por-numero-digital/pagos-por-numero-digital.component';
import { ReporteDetallesPagosPorNumeroComponent } from './reporte-detalle-pagos-por-numero/reporte-detalles-pagos-por-numero.component';
import { ReporteDetallesCobPagComponent } from './reporte-detalles-cob-pag/reporte-detalles-cob-pag.component';

const routes: Routes = [
  { path: 'cxp', component: CxpComponent},
  { path: 'cxp/detalle', component: ReporteDetalleCxpComponent },
  { path: 'pagos-digital', component: PagoDigitalComponent },
  { path: 'pagos-digital/detalle', component: ReporteDetallesCobPagComponent },
  { path: 'pagos-por-numero', component: PagosPorNumeroDigitalComponent },
  { path: 'pagos-por-numero/detalle', component: ReporteDetallesPagosPorNumeroComponent },
  { path: 'ordenes-de-compra', component: OrdenesDeCompraDigitalComponent },
  { path: 'ordenes-de-compra/detalle', component: ReporteDetallesComponent },
  { path: 'notas-de-recepcion', component: NotasDeRecepcionDigitalComponent },
  { path: 'notas-de-recepcion/detalle', component: ReporteDetallesComponent },
  { path: 'factura-de-compra', component: FacturasDeCompraDigitalComponent },
  { path: 'factura-de-compra/detalle', component: ReporteDetallesComponent },
  { path: 'devoluciones-al-proveedor', component: DevolucionesAlProveedorDigitalComponent },
  { path: 'devoluciones-al-proveedor/detalle', component: ReporteDetallesComponent },
  { path: 'cotizaciones-al-proveedor', component: CotizacionesAlProveedorDigitalComponent },
  { path: 'cotizaciones-al-proveedor/detalle', component: ReporteDetallesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComprasRoutingModule {}
