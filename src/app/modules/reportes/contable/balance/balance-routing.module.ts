import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BalanceComprobacionComponent } from './balance-comprobacion/balance-comprobacion.component';
import { BalanceGeneralMensualComponent } from './balance-general-mensual/balance-general-mensual.component';
import { DetalleBalanceGeneralHijoComponent } from './detalle-balance-general-hijo/detalle-balance-general-hijo.component';
import { DetalleBalanceComprobacionComponent } from './detalle-balance-comprobacion/detalle-balance-comprobacion.component';
import { DetalleBalanceGeneralMensualComponent } from './detalle-balance-general-mensual/detalle-balance-general-mensual.component';
import { BalanceGeneralHijoComponent } from './balance-general-hijo/balance-general-hijo.component';


const routes: Routes = [

  { path: 'comprobacion', component:  BalanceComprobacionComponent },
  { path: 'comprobacion/detalle', component:  DetalleBalanceComprobacionComponent },

  { path: 'general', component:  BalanceGeneralHijoComponent },
  { path: 'general/detalle', component:  DetalleBalanceGeneralHijoComponent },

  { path: 'general-mensual', component:  BalanceGeneralMensualComponent },
  { path: 'general-mensual/detalle', component:  DetalleBalanceGeneralMensualComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BalanceRoutingModule { }
