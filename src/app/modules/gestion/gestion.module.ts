import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GESTION_ROUTES } from './gestion.routing';
import { GestionDashboardComponent } from './gestion-dashboard/gestion-dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(GESTION_ROUTES)
  ],
  declarations: [
    GestionDashboardComponent
  ],
  exports:[
    GestionDashboardComponent,
    RouterModule
  ],
  providers:[]
})
export class GestionModule { }
