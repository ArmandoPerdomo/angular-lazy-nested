/**
 * Created by armando.perdomo on 30/07/2018.
 */
import {RouterModule, Routes} from '@angular/router';
import {TesoreriaComponent} from './tesoreria/tesoreria.component';
import {NgModule} from '@angular/core';
import {TodosAdministrativoComponent} from './todos-administrativo/todos-administrativo.component';

const routes: Routes = [
  {path: 'tesoreria', component: TesoreriaComponent},
  {path: 'todos', component: TodosAdministrativoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdministrativoRoutingModule {}
