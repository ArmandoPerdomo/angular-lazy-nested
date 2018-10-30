import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables'

const routes: Routes = [
  { path: 'balance', loadChildren: './balance/balance.module#BalanceModule' },
  { path: 'ganancia-perdida', loadChildren: './ganacia-perdida/ganacia-perdida.module#GanaciaPerdidaModule' },

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    DataTablesModule
  ],
  exports: [RouterModule],
  providers: []
})

export class ContableRoutingModule { }
