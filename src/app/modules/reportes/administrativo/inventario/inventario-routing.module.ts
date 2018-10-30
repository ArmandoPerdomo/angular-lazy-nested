import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoStockDisponibleComponent } from './listado-stock-disponible/listado-stock-disponible.component';
import { StockDisponibleComponent} from './stock-disponible/stock-disponible.component';
import { ListadoComprasVsVentasComponent } from './listado-compras-vs-ventas/listado-compras-vs-ventas.component';
import { ComprasVsVentasComponent } from './compras-vs-ventas/compras-vs-ventas.component';

 const routes: Routes = [
  { path: 'lista-stock-disponible', component: StockDisponibleComponent },
  { path: 'lista-stock-disponible/detalle', component: ListadoStockDisponibleComponent },
  { path: 'compras-vs-ventas', component: ComprasVsVentasComponent },
  { path: 'compras-vs-ventas/detalle', component: ListadoComprasVsVentasComponent }];

  @NgModule
  ({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class InventarioRoutingModule {}
