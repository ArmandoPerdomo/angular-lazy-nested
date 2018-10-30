import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodosGerencialComponent } from './todos-gerencial/todos-gerencial.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { LoadingModule } from 'ngx-loading';
import { GerencialRoutingModule } from './gerencial-routing.module';
import { RepGenTodosAdminService } from '../../../core/services/gerencial/repGenTodosAdmin.service';
import { MaterialDesignModule } from '../../../core/UI/material-design/material-design.module';
import { ChartsModule } from 'ng2-charts';
import { ComponentsModule } from '../../compartidos/utils/components.module';
import { ListaMonedaService } from '../../../core/services/listas/lista-monedas.service';
import { RepGerencialFavService } from '../../../core/services/gerencial/repGerencialFav.service';
import { ReporteAuditoriaComponent } from './it/reporte-auditoria/reporte-auditoria.component';
import { MatTabsModule } from '@angular/material';
import { RepGenAuditoriaGenService } from '../../../core/services/gerencial/repGenAuditoriaGen.service';
import { RepGenAuditoriaIndividualService } from '../../../core/services/gerencial/repGenAuditoriaIndividual.service';
import { ListaUsuarioGerencialService } from '../../../core/services/listas/lista-usuario-gerencial.service';
import { PipesModule } from '../../../core/pipes/pipes.module';
import { pdfAuditoriaGeneralService } from '../../../core/services/exportables/gerencial/pdf-auditoria-general.service';
import { pdfAuditoriaIndividualService } from '../../../core/services/exportables/gerencial/pdf-auditoria-individual.service';
import { GraphicComponent } from './it/reporte-auditoria/graphic/graphic.component';
import { ListaGraficaService } from '../../../core/services/listas/section-mock/lista-graficas.service';

@NgModule({
  imports: [
    ComponentsModule,
    ChartsModule,
    MaterialDesignModule,
    CommonModule,
    FormsModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    NgbModule,
    MatTabsModule,
    NgSelectModule,
    LoadingModule,
    PipesModule,
    GerencialRoutingModule
  ],
  declarations:[
    TodosGerencialComponent,
    ReporteAuditoriaComponent,
    GraphicComponent
  ],
  exports: [],
  providers: [
    NgbActiveModal,
    ListaUsuarioGerencialService,
    ListaMonedaService,
    ListaGraficaService,
    RepGenTodosAdminService,
    RepGerencialFavService,
    RepGenAuditoriaGenService,
    RepGenAuditoriaIndividualService,
    pdfAuditoriaGeneralService,
    pdfAuditoriaIndividualService
  ],
  entryComponents: [
    GraphicComponent
  ],
  
})
export class GerencialModule {}
