import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionarPlantillaVentaComponent } from './gestionar-plantilla-venta/gestionar-plantilla-venta.component';
import {NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {BarraTareaComponent} from '../../compartidos/barra-tarea/barra-tarea.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponenteGeneralesComponent } from '../../compartidos/componente-generales/componente-generales.component';
import { ComponenteAdicionalesComponent } from '../../compartidos/componente-adicionales/componente-adicionales.component';
import { GestionarPedidoComponent } from './gestionar-pedido/gestionar-pedido.component';
import { GestionarCotizacionComponent } from './gestionar-cotizacion/gestionar-cotizacion.component';
import { GestionarDevolucionComponent } from './gestionar-devolucion/gestionar-devolucion.component';
import { GestionVentasRoutingModule } from './gestion-ventas.routing';
import { ListarVendedorService } from '../../../core/services/gestion-ventas/listar-vendedor.service';
import { ListarTransportesService } from '../../../core/services/gestion-ventas/listar-transportes.service';
import { ListarCondicionesService } from '../../../core/services/gestion-ventas/listar-condiciones.service';
import { ListarMonedaService } from '../../../core/services/gestion-ventas/listar-moneda.service';
import { ListaAlmacenService } from '../../../core/services/gestion-ventas/listar-almacen.service';
import { ListaUnidadService } from '../../../core/services/gestion-ventas/listar-unidad.service';
import { ListaArt } from '../../../core/services/gestion-ventas/listar-articulos.service';
import { GetArticuloService } from '../../../core/services/gestion-ventas/getArticulo.service';
import { CalcularItemService } from '../../../core/services/gestion-ventas/calcularItem.service';
import { DesplazamientoService } from '../../../core/services/gestion-ventas/desplazamiento.service';
import { SetPlantillaVentaService } from '../../../core/services/gestion-ventas/setPlantillaVenta.service';
import { GetPlantillaVentaService } from '../../../core/services/gestion-ventas/getPlantillaVenta.service';
import { ListaArticuloAyudaService } from '../../../core/services/gestion-ventas/listaArticuloAyuda.service';
import { GetStocActualkArtService } from '../../../core/services/gestion-ventas/getStocActualkArt.service';
import { ListaPlantillaVentaService } from '../../../core/services/gestion-ventas/listaPlantillaVenta.service';
import { ModalAyudaArtComponent } from '../../compartidos/modal-ayuda-art/modal-ayuda-art.component';
import { ModalPlantillaBtimportarComponent } from '../../compartidos/modal-plantilla-btimportar/modal-plantilla-btimportar.component';
import { ModalImportarComponent } from '../../compartidos/modal-importar/modal-importar.component';
import { ListaClienteService } from '../../../core/services/gestion-ventas/listar-clientes.service';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    GestionVentasRoutingModule
  ],
  declarations: [
    GestionarPlantillaVentaComponent,
    BarraTareaComponent,
    ComponenteGeneralesComponent,
    ComponenteAdicionalesComponent,
    GestionarPedidoComponent,
    GestionarCotizacionComponent,
    GestionarDevolucionComponent,
    ModalAyudaArtComponent,
    ModalPlantillaBtimportarComponent,
    ModalImportarComponent
  ],
  exports: [],
  providers:[
    ListaClienteService, 
    ListarVendedorService,
    ListarTransportesService,
    ListarCondicionesService,
    ListarMonedaService,
    ListaAlmacenService,
    ListaUnidadService,
    ListaArt,
    GetArticuloService,
    CalcularItemService,
    DesplazamientoService,
    SetPlantillaVentaService,
    GetPlantillaVentaService,
    ListaArticuloAyudaService,
    NgbActiveModal,
    GetStocActualkArtService,
    ListaPlantillaVentaService
  ]
 
})
export class GestionVentasModule { }
