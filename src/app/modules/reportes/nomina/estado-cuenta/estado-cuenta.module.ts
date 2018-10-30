import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadoCuentaRoutingModule } from './estado-cuenta-routing.module';
import { EdoPrestacionesComponent } from './edo-prestaciones/edo-prestaciones.component';
import { EdoPrestamoComponent } from './edo-prestamo/edo-prestamo.component';
import { EdoUtilidadesComponent } from './edo-utilidades/edo-utilidades.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Angular2FontawesomeModule } from 'angular2-fontawesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReporteDetalleEdoPrestacionesComponent } from './reporte-detalle-edo-prestaciones/reporte-detalle-edo-prestaciones.component';
import { ReporteDetalleEdoPrestamoComponent } from './reporte-detalle-edo-prestamo/reporte-detalle-edo-prestamo.component';
import { ReporteDetalleEdoUtilidadesComponent } from './reporte-detalle-edo-utilidades/reporte-detalle-edo-utilidades.component';
import { MatTabsModule} from '@angular/material';
import { ComponentsModule } from '../../../compartidos/utils/components.module';
import { PipesModule } from '../../../../core/pipes/pipes.module';
import { PdfEcPrestacionesService } from '../../../../core/services/exportables/nomina/estado-cuenta/prestaciones/pdf-ec-prestaciones.service';
import { RepEdoCuentaPrestacionesService } from '../../../../core/services/estados_de_cuenta/repEdoCuentaPrestaciones.service';
import { RepNomEdoCtaUtilidadesService } from '../../../../core/services/estados_de_cuenta/repNomEdoCtaUtilidades.service';
import { RepEdoCuentaPrestamosService } from '../../../../core/services/estados_de_cuenta/repEdoCuentaPrestamos.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PdfEcPrestamoService } from '../../../../core/services/exportables/nomina/estado-cuenta/prestamo/pdf-ec-prestamo.service';
import { PdfEcUtilidadesService } from '../../../../core/services/exportables/nomina/estado-cuenta/utilidades/pdf-ec-utilidades.service';
import { ListaContratoService } from '../../../../core/services/listas/lista-contrato.service';
import { ListaEdoCuentaPrestamoService } from '../../../../core/services/listas/section-mock/lista-edo-cuentas-prestamos.service';
import { ListaTipoPrestamoService } from '../../../../core/services/listas/lista-tipo-prestamo.service';
import { ListaConceptoService } from '../../../../core/services/listas/lista-concepto.service';
import { ListaDepartamentoService } from '../../../../core/services/listas/lista-departamento.service';
import { ListaContGeneradoService } from '../../../../core/services/listas/lista-cont-generado.service';
import { ListaDepartamentoGeneradoService } from '../../../../core/services/listas/lista-departamento-gen.service';

@NgModule({
  imports: [
    CommonModule,
    EstadoCuentaRoutingModule,
    NgbModule,
    Angular2FontawesomeModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    MatTabsModule,
    ComponentsModule,
    PipesModule,
    NgxDatatableModule
  ],
  providers: [
    ListaContratoService,
    ListaConceptoService,
    ListaDepartamentoService,
    ListaTipoPrestamoService,
    ListaContGeneradoService,
    ListaDepartamentoGeneradoService,
    ListaEdoCuentaPrestamoService,
    RepEdoCuentaPrestacionesService,
    RepEdoCuentaPrestamosService,
    RepNomEdoCtaUtilidadesService,
    PdfEcPrestacionesService,
    PdfEcPrestamoService,
    PdfEcUtilidadesService
  ],
  declarations: [
    EdoPrestacionesComponent,
    EdoPrestamoComponent,
    EdoUtilidadesComponent,
    ReporteDetalleEdoPrestacionesComponent,
    ReporteDetalleEdoPrestamoComponent,
    ReporteDetalleEdoUtilidadesComponent
  ],
  exports: [
    EdoPrestacionesComponent,
    EdoPrestamoComponent,
    EdoUtilidadesComponent,
    ReporteDetalleEdoPrestacionesComponent,
    ReporteDetalleEdoPrestamoComponent,
    ReporteDetalleEdoUtilidadesComponent
  ]
})
export class EstadoCuentaModule {}
