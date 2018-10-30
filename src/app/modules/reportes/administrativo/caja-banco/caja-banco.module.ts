import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Angular2FontawesomeModule } from 'angular2-fontawesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CajaBancoRoutingModule } from './caja-banco-routing.module';
import { OrdenesPagoComponent } from './ordenes-pago/ordenes-pago.component';
import { OrdenPagoFormatoComponent } from './ordenes-pago/orden-pago-formato/orden-pago-formato.component';
import { MovimientoFormatoDigitalComponent } from './movimiento-banco/movimiento-formato-digital/movimiento-formato-formulario/movimiento-formato-digital.component';
import { MovimientoFormatoTablaComponent } from './movimiento-banco/movimiento-formato-digital/movimiento-formato-tabla/movimiento-formato-tabla.component';
import { MovimientoNumeroTablaComponent } from './movimiento-banco/movimientos-banco/movimiento-numero-tabla/movimiento-numero-tabla.component';
import { FlujoCajaComponent } from './flujo-caja/flujo-caja/flujo-caja.component';
import { DisponibilidadComponent } from './flujo-caja/detalle-disponibilidad/disponibilidad.component';
import { MovimientosBancoComponent } from './movimiento-banco/movimientos-banco/movimiento-numero-formulario/movimientos-banco.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PipesModule } from '../../../../core/pipes/pipes.module';
import { STYLE_LOADING } from '../../../../core/constants/styleLoading.constant';
import { LoadingModule } from 'ngx-loading';
import { ComponentsModule } from '../../../compartidos/utils/components.module';
import { PdfMovimientoFormatoService } from '../../../../core/services/exportables/administrativo/caja-banco/movimiento-formato/pdf-movimiento-formato.service';
import { PdfDisponibilidadCajaService } from '../../../../core/services/exportables/administrativo/caja-banco/disponibilidad-caja/pdf-disponibilidad-caja.service';
import { PdfOrdenPagoService } from '../../../../core/services/exportables/administrativo/caja-banco/orden-pago/pdf-orden-pago.service';
import { PdfMovimientoNumeroService } from '../../../../core/services/exportables/administrativo/caja-banco/movimiento-por-numero/pdf-movimiento-numero.service';
import { RepAdmDisponibilidadService } from '../../../../core/services/caja-blanco/repAdmDisponibilidad.service';
import { ListaBancoFormatoDigitalService } from '../../../../core/services/listas/section-mock/lista-banco-formato-digital.service';
import { RepAdmFormatoMovBancoService } from '../../../../core/services/caja-blanco/repAdmFormatoMovBanco.service';
import { RepAdmMovBancoxNumeroService } from '../../../../core/services/caja-blanco/repAdmMovBancoxNumero.service';
import { RepAdmFormatoPago2Service } from '../../../../core/services/caja-blanco/repAdmFormatoPago2.service';

@NgModule({
  imports: [
    CommonModule,
    CajaBancoRoutingModule,
    NgbModule,
    Angular2FontawesomeModule,
    ReactiveFormsModule,
    FormsModule,
    NgxDatatableModule,
    PipesModule,
    LoadingModule.forRoot(STYLE_LOADING),
    ComponentsModule
  ],
  declarations: [
    DisponibilidadComponent,
    MovimientoFormatoDigitalComponent,
    MovimientosBancoComponent,
    MovimientoFormatoTablaComponent,
    MovimientoNumeroTablaComponent,
    OrdenesPagoComponent,
    OrdenPagoFormatoComponent,
    FlujoCajaComponent
  ],
  exports: [],
  providers: [
    ListaBancoFormatoDigitalService,
    RepAdmDisponibilidadService,
    RepAdmFormatoPago2Service,
    RepAdmFormatoMovBancoService,
    RepAdmMovBancoxNumeroService,
    PdfMovimientoFormatoService,
    PdfDisponibilidadCajaService,
    PdfOrdenPagoService,
    PdfMovimientoNumeroService,
  ]
})
export class CajaBancoModule {}
