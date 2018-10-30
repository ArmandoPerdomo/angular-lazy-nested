/**
 * Created by armando.perdomo on 30/07/2018.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteComprasComponent } from './reporte-compras/reporte-compras.component';
import { ReporteVentasComponent } from './reporte-ventas/reporte-ventas.component';
import { TodosComercialComponent } from './todos-comercial/todos-comercial.component';
import { ComponentsModule } from '../../../compartidos/utils/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { MaterialDesignModule } from '../../../../core/UI/material-design/material-design.module';
import { ComercialRoutingModule } from './comercial-routing.module';

@NgModule({
  imports: [
    ComercialRoutingModule,
    CommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    MaterialDesignModule
  ],
  declarations: [
    ReporteComprasComponent, 
    ReporteVentasComponent,
    TodosComercialComponent
  ]
})
export class ComercialGerencialModule { }
