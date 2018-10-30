import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Angular2FontawesomeModule } from 'angular2-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdministrativoRoutingModule } from './Administrativo-routing.module';
import { ListaArticulosSublineaService } from '../../../core/services/listas/lista-articulos-sublinea.service';
import { ListaArticulosService } from '../../../core/services/listas/lista-articulos.service';
import { ListaArticulosCategoriaService } from '../../../core/services/listas/lista-articulos-categoria.service';
import { ListaArticulosLineaService } from '../../../core/services/listas/lista-articulos-linea.service';
import { ListaTipoService } from '../../../core/services/listas/lista-tipo.service';
import { ListaProveedoresService } from '../../../core/services/listas/lista-proveedores.service';
import { ListaSegmentosService } from '../../../core/services/listas/lista-segmentos.service';
import { ListaZonasService } from '../../../core/services/listas/lista-zonas.service';
import { ListaCondicionesService } from '../../../core/services/listas/lista-condiciones.service';
import { RepAdmFormatosCobPagService } from '../../../core/services/reportes/repAdmFormatosCobPag.service';
import { RepAdmFormatosService } from '../../../core/services/reportes/repAdmFormatos.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Angular2FontawesomeModule,
    NgbModule,
    ReactiveFormsModule,
    AdministrativoRoutingModule
  ],
  declarations: [],
  exports: [],
  providers: [
    ListaArticulosSublineaService,
    ListaArticulosService,
    ListaArticulosCategoriaService,
    ListaArticulosLineaService,
    ListaTipoService,
    ListaProveedoresService,
    ListaSegmentosService,
    ListaZonasService,
    ListaCondicionesService,
    RepAdmFormatosCobPagService,
    RepAdmFormatosService,
  ],

})
export class AdministrativoModule { }
