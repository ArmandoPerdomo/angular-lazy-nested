import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReporteDetallesComponent} from './reporte-detalles/reporte-detalles.component';
import { ResumenFacturaComponent} from './resumen-factura/resumen-factura.component';
import { CxcComponent } from './cxc/cxc.component';
import { ListadoPrecioStockComponent } from './listado-precio-stock/listado-precio-stock.component';
import { DevolucionesDigitalComponent } from './devoluciones-digital/devoluciones-digital.component';
import { CobroDigitalComponent } from './cobro-digital/cobro-digital.component';
import { CotizacionesDigitalComponent } from './cotizaciones-digital/cotizaciones-digital.component';
import { FacturaDigitalComponent } from './factura-digital/factura-digital.component';
import { NotaDespachoDigitalComponent } from './nota-despacho-digital/nota-despacho-digital.component';
import { NotaEntregaDigitalComponent } from './nota-entrega-digital/nota-entrega-digital.component';
import { PedidoDigitalComponent } from './pedido-digital/pedido-digital.component';
import { PlantillaDigitalComponent } from './plantilla-digital/plantilla-digital.component';
import { ReporteCobroDetalleComponent } from './reporte-cobro-detalle/reporte-cobro-detalle.component';
import { ReporteResumenFacturaDetalleComponent } from './reporte-resumen-factura-detalle/reporte-resumen-factura-detalle.component';
import { ReporteCxCDetalleComponent } from './reporte-cxc-detalle/reporte-cxc-detalle.component';
import { ReporteDetalleListadoPrecioStockComponent } from './reporte-detalle-listado-precio-stock/reporte-detalle-listado-precio-stock.component';

const routes: Routes = [
  { path: 'listado-precio-stock', component: ListadoPrecioStockComponent},
  { path: 'listado-precio-stock/detalle', component: ReporteDetalleListadoPrecioStockComponent},
  { path: 'cxc', component: CxcComponent },
  { path: 'cxc/detalle', component: ReporteCxCDetalleComponent },
  { path: 'factura-digital', component: FacturaDigitalComponent },
  { path: 'factura-digital/detalle', component: ReporteDetallesComponent},
  { path: 'resumen-factura', component: ResumenFacturaComponent},
  { path: 'resumen-factura/detalle', component: ReporteResumenFacturaDetalleComponent },
  { path: 'cotizaciones-digital', component: CotizacionesDigitalComponent },
  { path: 'cotizaciones-digital/detalle', component: ReporteDetallesComponent},
  { path: 'devoluciones-digital', component: DevolucionesDigitalComponent },
  { path: 'devoluciones-digital/detalle', component: ReporteDetallesComponent},
  { path: 'pedido-digital', component: PedidoDigitalComponent },
  { path: 'pedido-digital/detalle', component: ReporteDetallesComponent },
  { path: 'nota-entrega-digital', component: NotaEntregaDigitalComponent },
  { path: 'nota-entrega-digital/detalle', component: ReporteDetallesComponent },
  { path: 'nota-despacho-digital', component: NotaDespachoDigitalComponent },
  { path: 'nota-despacho-digital/detalle', component: ReporteDetallesComponent},
  { path: 'plantilla-digital', component: PlantillaDigitalComponent },
  { path: 'plantilla-digital/detalle', component: ReporteDetallesComponent },
  { path: 'cobro-digital', component: CobroDigitalComponent },
  { path: 'cobro-digital/detalle', component: ReporteCobroDetalleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class VentasRoutingModule {}
