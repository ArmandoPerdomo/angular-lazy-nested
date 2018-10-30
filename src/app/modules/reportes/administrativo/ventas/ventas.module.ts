import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbDateParserFormatter, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Angular2FontawesomeModule } from 'angular2-fontawesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { VentasRoutingModule } from './ventas-routing.module';
import { ReporteDetallesComponent} from './reporte-detalles/reporte-detalles.component';
import { ResumenFacturaComponent} from './resumen-factura/resumen-factura.component';
import { CxcComponent } from './cxc/cxc.component';
import { DevolucionesDigitalComponent } from './devoluciones-digital/devoluciones-digital.component';
import { CotizacionesDigitalComponent } from './cotizaciones-digital/cotizaciones-digital.component';
import { PedidoDigitalComponent } from './pedido-digital/pedido-digital.component';
import { NotaEntregaDigitalComponent } from './nota-entrega-digital/nota-entrega-digital.component';
import { NotaDespachoDigitalComponent } from './nota-despacho-digital/nota-despacho-digital.component';
import { PlantillaDigitalComponent } from './plantilla-digital/plantilla-digital.component';
import { CobroDigitalComponent } from './cobro-digital/cobro-digital.component';
import { FacturaDigitalComponent } from './factura-digital/factura-digital.component';
import { FormatoAdmVentasComponent } from './global-component/formato-adm-ventas/formato-adm-ventas.component';
import { ListaPlanillaDevClientesComponent } from './global-component/listado-planilla-dev-clientes/lista-planilla-dev-clientes.component';
import { ReporteCobroDetalleComponent } from './reporte-cobro-detalle/reporte-cobro-detalle.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReporteResumenFacturaDetalleComponent } from './reporte-resumen-factura-detalle/reporte-resumen-factura-detalle.component';
import { LoadingModule } from 'ngx-loading';
import { ComponentsModule } from '../../../compartidos/utils/components.module';
import { ReporteCxCDetalleComponent } from "./reporte-cxc-detalle/reporte-cxc-detalle.component";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PipesModule } from '../../../../core/pipes/pipes.module';
import { ListadoPrecioStockComponent } from './listado-precio-stock/listado-precio-stock.component';
import { PdfResumenFacturaService } from '../../../../core/services/exportables/administrativo/ventas/resumen-factura/pdf-resumen-factura.service';
import { PdfCobroDigitalService } from '../../../../core/services/exportables/administrativo/ventas/cobro-digital/pdf-cobro-digital.service';
import { PdfNotaEntregaService } from '../../../../core/services/exportables/administrativo/ventas/nota-entrega/pdf-nota-entrega.service';
import { PdfNotaDespachoService } from '../../../../core/services/exportables/administrativo/ventas/nota-despacho/pdf-nota-despacho.service';
import { PdfCotizacionDigitalService } from '../../../../core/services/exportables/administrativo/ventas/cotizacion-digital/pdf-cotizacion-digital.service';
import { PdfDevolucionDigitalService } from '../../../../core/services/exportables/administrativo/ventas/devolucion-digital/pdf-devolucion-digital.service';
import { PdfPedidoDigitalService } from '../../../../core/services/exportables/administrativo/ventas/pedido-digital/pdf-pedido-digital.service';
import { PdfPlantillaVentaService } from '../../../../core/services/exportables/administrativo/ventas/plantilla-venta/pdf-plantilla-venta.service';
import { PdfCxcClienteService } from '../../../../core/services/exportables/administrativo/ventas/cxc-cliente/pdf-cxc-cliente.service';
import { PdfFacturaDigitalService } from '../../../../core/services/exportables/administrativo/ventas/facturas-digital/pdf-factura-digital.service';
import { ListaPrecioStockService } from '../../../../core/services/listas/section-mock/lista-precio-stock.service';
import { ListaVendedoresService } from '../../../../core/services/listas/lista-vendedores.service';
import { RepAdmPrecioxStockServices } from '../../../../core/services/ventas/repAdmPrecioxStock.service';
import { RepAdmFormatoCxCClientesService } from '../../../../core/services/ventas/repAdmFormatosCxcClientes.service';
import { ListaDocumentosService } from '../../../../core/services/listas/lista-documentos.service';
import { RepAdmFacturaResumenCompletoService } from '../../../../core/services/ventas/repAdmFacturaResumenCompleto.service';
import { ListaFacturaService } from '../../../../core/services/listas/lista-factura.service';
import { ReporteDetalleListadoPrecioStockComponent } from './reporte-detalle-listado-precio-stock/reporte-detalle-listado-precio-stock.component';
import { ImgArticuloComponent } from './reporte-detalle-listado-precio-stock/img-articulo/img-articulo.component';
import { RepAdminImagenServices } from '../../../../core/services/ventas/repAdminImagen.service';
import { ImageViewerModule } from "ngx-image-viewer";
import { MatTabsModule } from '@angular/material';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { PdfListadoPrecioStockService } from '../../../../core/services/exportables/administrativo/ventas/listado-precio-stock/pdf-listado-precio-stock.service';
@NgModule({
  imports: [
    CommonModule,
    VentasRoutingModule,
    NgbModule.forRoot(),
    Angular2FontawesomeModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    ComponentsModule,
    NgxDatatableModule,
    MatTabsModule,
    LoadingModule,
    PipesModule,
    ImageViewerModule.forRoot(), 
    MatProgressSpinnerModule
  ],
  declarations: [
    ReporteCobroDetalleComponent,
    DevolucionesDigitalComponent,
    ReporteDetallesComponent,
    ResumenFacturaComponent,
    CxcComponent,
    ListadoPrecioStockComponent,
    DevolucionesDigitalComponent,
    FormatoAdmVentasComponent,
    ListaPlanillaDevClientesComponent,
    CotizacionesDigitalComponent,
    PedidoDigitalComponent,
    NotaEntregaDigitalComponent,
    NotaDespachoDigitalComponent,
    PlantillaDigitalComponent,
    CobroDigitalComponent,
    FacturaDigitalComponent,
    ReporteCobroDetalleComponent,
    ReporteResumenFacturaDetalleComponent,
    ReporteCxCDetalleComponent,
    ReporteDetalleListadoPrecioStockComponent,
    ImgArticuloComponent,
    
  ],
  entryComponents: [ImgArticuloComponent],

  exports: [],
  providers: [
   
    NgbActiveModal,
    ListaPrecioStockService,
    ListaVendedoresService,
    ListaDocumentosService,
    ListaFacturaService,
    RepAdmFacturaResumenCompletoService,
    RepAdmPrecioxStockServices,
    RepAdminImagenServices,
    RepAdmFormatoCxCClientesService,
    PdfListadoPrecioStockService,
    PdfResumenFacturaService,
    PdfCobroDigitalService,
    PdfNotaEntregaService,
    PdfNotaDespachoService,
    PdfCotizacionDigitalService,
    PdfDevolucionDigitalService,
    PdfPedidoDigitalService,
    PdfPlantillaVentaService,
    PdfCxcClienteService,
    PdfFacturaDigitalService
  ]
})
export class VentasModule {}
