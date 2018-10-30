/**
 * Created by armando.perdomo on 30/07/2018.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrativoRoutingModule} from './administrativo-routing.module';
import { TesoreriaComponent} from './tesoreria/tesoreria.component';
import { TodosAdministrativoComponent} from './todos-administrativo/todos-administrativo.component';
import { ComponentsModule } from '../../../compartidos/utils/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { MaterialDesignModule } from '../../../../core/UI/material-design/material-design.module';

@NgModule({
  imports: [
    CommonModule,
    AdministrativoRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    MaterialDesignModule
  ],
  declarations: [
    TesoreriaComponent, 
    TodosAdministrativoComponent
  ],

})
export class AdministrativoGerencialModule { }
