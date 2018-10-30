import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'ventas', loadChildren: './ventas/ventas.module#VentasModule' },
  { path: 'compras', loadChildren: './compras/compras.module#ComprasModule' },
  { path: 'inventario', loadChildren: './inventario/inventario.module#InventarioModule' },
  { path: 'caja-banco', loadChildren: './caja-banco/caja-banco.module#CajaBancoModule' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: []
})
export class AdministrativoRoutingModule { }
