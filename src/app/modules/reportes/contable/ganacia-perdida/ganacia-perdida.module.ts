import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GanaciaPerdidaRoutingModule } from './ganacia-perdida-routing.module';
import { GananciaPerdidaHijoComponent } from './ganancia-perdida-hijo/ganancia-perdida-hijo.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Angular2FontawesomeModule } from 'angular2-fontawesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { GanaciaPerdidaMensualComponent } from './ganacia-perdida-mensual/ganacia-perdida-mensual.component';
import { DetalleGananciaPerdidaComponent } from './detalle-ganancia-perdida/detalle-ganancia-perdida.component';
import { DetalleGananciaPerdidaMensualComponent } from './detalle-ganancia-perdida-mensual/detalle-ganancia-perdida-mensual.component';
import { PipesModule } from '../../../../core/pipes/pipes.module';
import { ComponentsModule } from '../../../compartidos/utils/components.module';
import { TreeTableModule } from 'primeng/treetable';

@NgModule({
  imports: [
    CommonModule,
    PipesModule,
    ComponentsModule,
    TreeTableModule,
    GanaciaPerdidaRoutingModule,
    NgbModule,
    Angular2FontawesomeModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule
  ],

  declarations: [
    GananciaPerdidaHijoComponent,
    GanaciaPerdidaMensualComponent, 
    DetalleGananciaPerdidaComponent, 
    DetalleGananciaPerdidaMensualComponent
  ],
})
export class GanaciaPerdidaModule { }
