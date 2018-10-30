import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CONFIGURACION_ROUTES } from './configuracion.routing';
import { ConfiguracionDashboardComponent } from './configuracion-dashboard/configuracion-dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CONFIGURACION_ROUTES)
  ],
  declarations: [ConfiguracionDashboardComponent]
})
export class ConfiguracionModule { }
