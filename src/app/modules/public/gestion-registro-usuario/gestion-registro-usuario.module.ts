import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponenteTituloComponent } from './Solicitudes-Registro-Usuario/componente-titulo/componente-titulo.component';
import { ComponenteTituloGestionComponent } from './Gestion-Solicitud/componente-titulo-gestion/componente-titulo-gestion.component';
import { ComponenteFormularioGestionComponent } from './Gestion-Solicitud/componente-formulario-gestion/componente-formulario-gestion.component';
import { ComponenteImagenGestionComponent } from './Gestion-Solicitud/componente-imagen-gestion/componente-imagen-gestion.component';
import { ComponenteRifGestionComponent } from './Gestion-Solicitud/componente-rif-gestion/componente-rif-gestion.component';
import { ComponenteEmpresasGestionComponent } from './Gestion-Solicitud/componente-empresas-gestion/componente-empresas-gestion.component';
import { ComponenteFormularioSolicitudesComponent } from './Solicitudes-Registro-Usuario/componente-formulario-solicitudes/componente-formulario-solicitudes.component';
import { ComponenteListaSolicitudesComponent } from './Solicitudes-Registro-Usuario/componente-lista-solicitudes/componente-lista-solicitudes.component';
import { Angular2FontawesomeModule } from 'angular2-fontawesome';
import { GestionUsuarioIndexComponent } from './Gestion-Solicitud/gestion-usuario-index/gestion-usuario-index.component';
import { VistasSruComponent } from './Solicitudes-Registro-Usuario/vistas-sru/vistas-sru.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Angular2FontawesomeModule
  ],
  declarations: [
    ComponenteTituloComponent,
    ComponenteTituloGestionComponent,
    ComponenteFormularioGestionComponent,
    ComponenteImagenGestionComponent,
    ComponenteRifGestionComponent,
    ComponenteEmpresasGestionComponent,
    ComponenteFormularioSolicitudesComponent,
    ComponenteListaSolicitudesComponent,
    GestionUsuarioIndexComponent,
    VistasSruComponent
    ],

  exports: [ComponenteTituloComponent,
    ComponenteTituloGestionComponent,
    ComponenteFormularioGestionComponent,
    ComponenteImagenGestionComponent,
    ComponenteRifGestionComponent,
    ComponenteEmpresasGestionComponent,
    ComponenteFormularioSolicitudesComponent,
    ComponenteListaSolicitudesComponent,
    GestionUsuarioIndexComponent,
    VistasSruComponent]

})
export class GestionRegistroUsuarioModule { }
