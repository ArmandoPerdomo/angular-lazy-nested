import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NominaRoutingModule } from './nomina-routing.module';
import { NgbModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ReciboNominaComponent } from './recibo-nomina/recibo-nomina.component';
import { ReporteDetalleReciboPagoComponent } from './reporte-detalle-recibo-pago/reporte-detalle-recibo-pago.component';
import { ComponentsModule } from '../../compartidos/utils/components.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PipesModule } from '../../../core/pipes/pipes.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { RepNomReciboPagoService } from '../../../core/services/estados_de_cuenta/repNomReciboPago.service';
import { ListaTrabajadoresService } from '../../../core/services/listas/lista-trabajadores.service';
import { pdfReciboNominaService } from '../../../core/services/exportables/nomina/recibo/pdf-recibo-nomina.service';

@NgModule({
  imports: [
    CommonModule,
    NominaRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgxDatatableModule,
    PipesModule,
    NgSelectModule,
    NgbDatepickerModule,
    ComponentsModule
  ],
  declarations: [
    ReciboNominaComponent,
    ReporteDetalleReciboPagoComponent
  ],
  providers: [
    RepNomReciboPagoService,
    ListaTrabajadoresService,
    pdfReciboNominaService
  ],
  exports: []
})
export class NominaModule {}
