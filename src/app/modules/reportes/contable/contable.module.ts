import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContableRoutingModule } from './contable-routing.module';
import { RepConGananciasyPerdidasMesesService } from '../../../core/services/contables/repConGananciasyPerdidasMeses.service';
import { RepConBalanceComprobacionService } from '../../../core/services/contables/repConBalanceComprobacion.service';
import { ListaContableService } from '../../../core/services/listas/section-mock/lista-contable.service';
import { RepConBalanceGeneralService } from '../../../core/services/balance/repConBalanceGen.service';
import { RepConBalanceGeneralCompService } from '../../../core/services/contables/repConBalanceGeneralComp.service';
import { PdfBalanceComprobacionService } from '../../../core/services/exportables/contable/balance/pdf-balance-comprobacion.service';
import { PdfBalanceGeneralService } from '../../../core/services/exportables/contable/balance/pdf-balance-general.service';
import { RepConGananciasyPerdidasService } from '../../../core/services/contables/repConGananciasyPerdidas.service';
import { PdfGananciaPerdidaService } from '../../../core/services/exportables/contable/balance/pdf-ganancia-perdida.service';
import { PdfContableMensualService } from '../../../core/services/exportables/contable/balance/pdf-ganancia-perdida-mensual.service';

@NgModule({
  imports: [
    CommonModule,
    ContableRoutingModule
  ],
  declarations: [],
  providers: [
    ListaContableService,
    RepConBalanceComprobacionService,
    RepConBalanceGeneralService,
    RepConGananciasyPerdidasMesesService,
    RepConGananciasyPerdidasService,
    RepConBalanceGeneralCompService,
    PdfBalanceComprobacionService,
    PdfBalanceGeneralService,
    PdfGananciaPerdidaService,
    PdfContableMensualService
  ],

})
export class ContableModule {}
