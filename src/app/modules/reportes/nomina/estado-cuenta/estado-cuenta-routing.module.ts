import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EdoPrestacionesComponent } from './edo-prestaciones/edo-prestaciones.component';
import { EdoPrestamoComponent } from './edo-prestamo/edo-prestamo.component';
import { EdoUtilidadesComponent } from './edo-utilidades/edo-utilidades.component';
import { ReporteDetalleEdoPrestacionesComponent } from './reporte-detalle-edo-prestaciones/reporte-detalle-edo-prestaciones.component';
import { ReporteDetalleEdoPrestamoComponent } from './reporte-detalle-edo-prestamo/reporte-detalle-edo-prestamo.component';
import { ReporteDetalleEdoUtilidadesComponent } from './reporte-detalle-edo-utilidades/reporte-detalle-edo-utilidades.component';

const routes: Routes = [
  { path: 'prestaciones', component:  EdoPrestacionesComponent },
  { path: 'prestaciones/detalle', component:  ReporteDetalleEdoPrestacionesComponent },
  { path: 'prestamo', component:  EdoPrestamoComponent },
  { path: 'prestamo/detalle', component: ReporteDetalleEdoPrestamoComponent },
  { path: 'utilidades', component:  EdoUtilidadesComponent },
  { path: 'utilidades/detalle', component: ReporteDetalleEdoUtilidadesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstadoCuentaRoutingModule { }
