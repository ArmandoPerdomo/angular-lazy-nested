import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Angular2FontawesomeModule } from 'angular2-fontawesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InventarioRoutingModule } from './inventario-routing.module';
import { ListadoStockDisponibleComponent } from './listado-stock-disponible/listado-stock-disponible.component';
import { StockDisponibleComponent } from './stock-disponible/stock-disponible.component';
import { ListadoComprasVsVentasComponent } from './listado-compras-vs-ventas/listado-compras-vs-ventas.component';
import { ComprasVsVentasComponent } from './compras-vs-ventas/compras-vs-ventas.component';
import { ComponentsModule } from '../../../compartidos/utils/components.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PipesModule } from '../../../../core/pipes/pipes.module';
import { PdfComprasVsVentasService } from '../../../../core/services/exportables/administrativo/inventario/compras-vs-ventas/pdf-compras-vs-ventas.service';
import { PdfStockDisponibleService } from '../../../../core/services/exportables/administrativo/inventario/stock-disponible/pdf-stock-disponible.service';
import { ListaArticulosAlmacenService } from '../../../../core/services/listas/lista-articulos-almacen.service';
import { RepAdmVentasVsComprasService } from '../../../../core/services/inventario/repAdmVentasVsCompras.service';
import { ListaConMovimientosService } from '../../../../core/services/listas/lista-con-movimientos.service';
import { ListaTipoDeUnidadService } from '../../../../core/services/listas/lista-tipo-de-unidad.service';
import { RepAdmStockDisponibleService } from '../../../../core/services/inventario/repAdmStockDisponible.service';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    InventarioRoutingModule,
    NgbModule,
    Angular2FontawesomeModule,
    ReactiveFormsModule,
    FormsModule,
    NgxDatatableModule,
    PipesModule
  ],
  providers: [
    ListaArticulosAlmacenService,
    ListaConMovimientosService,
    ListaTipoDeUnidadService,
    RepAdmVentasVsComprasService,
    RepAdmStockDisponibleService,
    PdfComprasVsVentasService,
    PdfStockDisponibleService,
  ],
  declarations: [
    ListadoStockDisponibleComponent,
    StockDisponibleComponent,
    ListadoComprasVsVentasComponent,
    ComprasVsVentasComponent,
  ],
  exports: [],
})
export class InventarioModule {}
