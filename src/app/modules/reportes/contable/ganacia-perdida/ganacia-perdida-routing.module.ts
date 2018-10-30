import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GananciaPerdidaHijoComponent } from './ganancia-perdida-hijo/ganancia-perdida-hijo.component';
import { GanaciaPerdidaMensualComponent } from './ganacia-perdida-mensual/ganacia-perdida-mensual.component';
import { DetalleGananciaPerdidaComponent } from './detalle-ganancia-perdida/detalle-ganancia-perdida.component';
import { DetalleGananciaPerdidaMensualComponent } from './detalle-ganancia-perdida-mensual/detalle-ganancia-perdida-mensual.component';

const routes: Routes = [
  { path: 'ganancia-perdida', component:  GananciaPerdidaHijoComponent },
  { path: 'ganancia-perdida/detalle', component:  DetalleGananciaPerdidaComponent },
  { path: 'ganancia-perdida-mensual', component:  GanaciaPerdidaMensualComponent },
  { path: 'ganancia-perdida-mensual/detalle', component:  DetalleGananciaPerdidaMensualComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GanaciaPerdidaRoutingModule { }
