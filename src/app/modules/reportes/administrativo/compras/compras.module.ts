import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Angular2FontawesomeModule } from 'angular2-fontawesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ComprasRoutingModule } from './compras-routing.module';
import { CxpComponent } from './cxp/cxp.component';
import { ReporteDetalleCxpComponent } from './reporte-detalle-cxp/reporte-detalle-cxp.component';
import { PagoDigitalComponent } from './pago-digital/pago-digital.component';
import { OrdenesDeCompraDigitalComponent } from './ordenes-de-compra-digital/ordenes-de-compra-digital.component';
import { NotasDeRecepcionDigitalComponent } from './notas-de-recepcion-digital/notas-de-recepcion-digital.component';
import { FacturasDeCompraDigitalComponent } from './facturas-de-compra-digital/facturas-de-compra-digital.component';
import { DevolucionesAlProveedorDigitalComponent } from './devoluciones-al-proveedor-digital/devoluciones-al-proveedor-digital.component';
import { CotizacionesAlProveedorDigitalComponent } from './cotizaciones-al-proveedor-digital/cotizaciones-al-proveedor-digital.component';
import { PagosPorNumeroDigitalComponent } from './pagos-por-numero-digital/pagos-por-numero-digital.component';
import { ReporteDetallesPagosPorNumeroComponent } from './reporte-detalle-pagos-por-numero/reporte-detalles-pagos-por-numero.component';
import { ReporteDetallesComponent } from './reporte-detalles/reporte-detalles.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormatoAdmComprasComponent } from './global-compras-component/formato-adm-compras/formato-adm-compras.component';
import { ReporteDetallesCobPagComponent } from './reporte-detalles-cob-pag/reporte-detalles-cob-pag.component';
import { ComponentsModule } from '../../../compartidos/utils/components.module';
import { NgbModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LoadingModule } from 'ngx-loading';
import { STYLE_LOADING } from "../../../../core/constants/styleLoading.constant";
import { PipesModule } from '../../../../core/pipes/pipes.module';
import { PdfCxpProveedorService } from '../../../../core/services/exportables/administrativo/compras/cxp-proveedor/pdf-cxp-proveedor.service';
import { PdfFacturaCompraService } from '../../../../core/services/exportables/administrativo/compras/factura-compra/pdf-factura-compra.service';
import { PdfNotasRecepcionService } from '../../../../core/services/exportables/administrativo/compras/notas-recepecion/pdf-notas-recepcion.service';
import { PdfCotizacionProveedorService } from '../../../../core/services/exportables/administrativo/compras/cotizacion-proveedor/pdf-cotizacion-proveedor.service';
import { PdfDevolucionProveedorService } from '../../../../core/services/exportables/administrativo/compras/devolucion-proveedor/pdf-devolucion-proveedor.service';
import { PdfPagoNumeroService } from '../../../../core/services/exportables/administrativo/compras/pago-numero/pdf-pago-numero.service';
import { PdfOrdenCompraService } from '../../../../core/services/exportables/administrativo/compras/orden-compra/pdf-orden-compra.service';
import { PdfPagoDigitalService } from '../../../../core/services/exportables/administrativo/compras/pagos-digital/pdf-pago-digital.service';
import { RepAdmCxPPorProveedorService } from '../../../../core/services/compras/repAdmCxPPorProveedor.service';
import { RepAdmPagoxNumeroService } from '../../../../core/services/compras/repAdmPagoxNumero.service';
import { ExcelService } from '../../../../core/services/exportables/parent/excel.service';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    ComprasRoutingModule,
    Angular2FontawesomeModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgxDatatableModule,
    PipesModule,
    NgSelectModule,
    NgbDatepickerModule,
    LoadingModule.forRoot(STYLE_LOADING)
  ],
  providers: [
    RepAdmCxPPorProveedorService,
    RepAdmPagoxNumeroService,
    PdfCxpProveedorService,
    PdfPagoDigitalService,
    PdfOrdenCompraService,
    PdfPagoNumeroService,
    PdfDevolucionProveedorService,
    PdfCotizacionProveedorService,
    PdfNotasRecepcionService,
    PdfFacturaCompraService,
    ExcelService,
  ],
  declarations: [
    CxpComponent,
    ReporteDetalleCxpComponent,
    CotizacionesAlProveedorDigitalComponent,
    FacturasDeCompraDigitalComponent,
    NotasDeRecepcionDigitalComponent,
    OrdenesDeCompraDigitalComponent,
    PagoDigitalComponent,
    PagosPorNumeroDigitalComponent,
    ReporteDetallesPagosPorNumeroComponent,
    ReporteDetallesComponent,
    DevolucionesAlProveedorDigitalComponent,
    FormatoAdmComprasComponent,
    ReporteDetallesCobPagComponent
  ]
})
export class ComprasModule {}
