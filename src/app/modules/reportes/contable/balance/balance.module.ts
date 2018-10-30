import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Angular2FontawesomeModule } from 'angular2-fontawesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BalanceRoutingModule } from './balance-routing.module';
import { BalanceComprobacionComponent } from './balance-comprobacion/balance-comprobacion.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { BalanceGeneralMensualComponent } from './balance-general-mensual/balance-general-mensual.component';
import { DetalleBalanceGeneralHijoComponent } from './detalle-balance-general-hijo/detalle-balance-general-hijo.component';
import { DetalleBalanceComprobacionComponent } from './detalle-balance-comprobacion/detalle-balance-comprobacion.component';
import { DetalleBalanceGeneralMensualComponent } from './detalle-balance-general-mensual/detalle-balance-general-mensual.component';
import { BalanceGeneralHijoComponent } from './balance-general-hijo/balance-general-hijo.component';
import {TreeTableModule} from 'primeng/treetable';
import { ComponentsModule } from '../../../compartidos/utils/components.module';
import { PipesModule } from '../../../../core/pipes/pipes.module';
import { PdfBalanceComprobacionService } from '../../../../core/services/exportables/contable/balance/pdf-balance-comprobacion.service';
import { PdfBalanceGeneralService } from '../../../../core/services/exportables/contable/balance/pdf-balance-general.service';


@NgModule({
  imports: [
    CommonModule,
    PipesModule,
    BalanceRoutingModule,
    CommonModule,
    ComponentsModule,
    NgbModule,
    Angular2FontawesomeModule,
    ReactiveFormsModule,
    FormsModule,
    TreeTableModule,
    NgSelectModule,
  ],
  declarations: [
    BalanceComprobacionComponent, 
    BalanceGeneralMensualComponent, 
    BalanceGeneralHijoComponent,
    DetalleBalanceGeneralHijoComponent, 
    DetalleBalanceComprobacionComponent, 
    DetalleBalanceGeneralMensualComponent
  ],

})
export class BalanceModule { }
