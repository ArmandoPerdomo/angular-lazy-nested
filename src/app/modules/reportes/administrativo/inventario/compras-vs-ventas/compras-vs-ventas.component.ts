import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ListaProveedoresIn } from '../../../../../abstract/DTO/in/listaProveedoresin';
import { ListaProveedoresService } from '../../../../../core/services/listas/lista-proveedores.service';
import { FormControlService } from '../../../../../core/services/form-control.service';
import { Router } from '@angular/router';
import { ListaArticulosLineaIn } from '../../../../../abstract/DTO/in/listaArticulosLineaIn';
import { ListaArticulosLineaService } from '../../../../../core/services/listas/lista-articulos-linea.service';
import { ListaArticulosCategoriaService } from '../../../../../core/services/listas/lista-articulos-categoria.service';
import { ListaConMovimientosService } from '../../../../../core/services/listas/lista-con-movimientos.service';
import { ListaTipoDeUnidadService } from '../../../../../core/services/listas/lista-tipo-de-unidad.service';
import { ListaArticulosAlmacenService } from '../../../../../core/services/listas/lista-articulos-almacen.service';
import { ListaArticulosAlmacenIn } from '../../../../../abstract/DTO/in/listaArticulosAlmacenIn';
import { ListaArticulosCategoriaIn } from '../../../../../abstract/DTO/in/listaArticulosCategoriaIn';
import { RepAdmVentasVsCompraIn } from '../../../../../abstract/DTO/in/reportesAdmInventario/repAdmVentasVsComprasIn';
import { Globals } from '../../../../../core/services/globals.service';
import { RepAdmVentasVsComprasOut } from '../../../../../abstract/DTO/out/reportesAdmInventario/repAdmVentasVsCompras/repAdmVentasVsComprasOut';
import { RepAdmVentasVsComprasService } from '../../../../../core/services/inventario/repAdmVentasVsCompras.service';
import { PdfComprasVsVentasService } from '../../../../../core/services/exportables/administrativo/inventario/compras-vs-ventas/pdf-compras-vs-ventas.service';

const now = new Date();
@Component({
  selector: 'app-compras-vs-ventas',
  templateUrl: './compras-vs-ventas.component.html',
  styleUrls: ['./compras-vs-ventas.component.css']
})
export class ComprasVsVentasComponent implements OnInit {

  constructor(
    public lisSto: ListaArticulosAlmacenService,
    public lisLin: ListaArticulosLineaService,
    public lisCat: ListaArticulosCategoriaService,
    public lisPro: ListaProveedoresService,
    public lisMov: ListaConMovimientosService,
    public lisUni: ListaTipoDeUnidadService,
    public formService: FormControlService,
    public router: Router,
    public pdf: PdfComprasVsVentasService,
    public global: Globals,
    public repAdmComvsVen: RepAdmVentasVsComprasService) {}

  //?Title.
  titListCompVen: String;

  //?Requests callbacks.
  storageCallback: Observable < any > ;
  lineCallback: Observable < any > ;
  categoryCallback: Observable < any > ;
  providerCallback: Observable < any > ;
  movementsCallback: Observable < any > ;
  unitTypeCallback: Observable < any > ;

  //?Formgroup.
  listCompVen: FormGroup;

  //?Models.
  send = '';
  itmF: String;
  itmU: String;
  stoF: String;
  stoU: String;
  linF: String;
  linU: String;
  cateF: String;
  cateU: String;
  provF: String;
  provU: String;
  move: String;
  unit: String;
  //?Dates.
  datF: NgbDateStruct;
  datU: NgbDateStruct;
  maxDate: NgbDateStruct;

  //?Boolean flag para campo de artículo.
  flag: boolean = true;

  ngOnInit() {
    //?Inicialización.
    this.titListCompVen = 'Compras vs. ventas';
    this.clearFields();

    //?Creación del FormGroup.
    this.listCompVen = new FormGroup({
      itemF: new FormControl(''),
      itemU: new FormControl(''),
      dateF: new FormControl('', [Validators.required]),
      dateU: new FormControl('', [Validators.required]),
      storageF: new FormControl(''),
      storageU: new FormControl(''),
      lineF: new FormControl(''),
      lineU: new FormControl(''),
      categoryF: new FormControl(''),
      categoryU: new FormControl(''),
      providerF: new FormControl(''),
      providerU: new FormControl(''),
      movements: new FormControl(''),
      unitType: new FormControl(''),
      sendTo: new FormControl('', [Validators.required]),
    });

    //?Providers requests.
    let lsto: ListaArticulosAlmacenIn = new ListaArticulosAlmacenIn();
    this.storageCallback = this.lisSto.listaArticulosAlmacen(lsto);

    let llin: ListaArticulosLineaIn = new ListaArticulosLineaIn();
    this.lineCallback = this.lisLin.listaArticulosLinea(llin);

    let lpro: ListaProveedoresIn = new ListaProveedoresIn();
    this.providerCallback = this.lisPro.listaProveedores(lpro);

    let lcat: ListaArticulosCategoriaIn = new ListaArticulosCategoriaIn();
    this.categoryCallback = this.lisCat.listaCategoria(lcat);

    this.movementsCallback = this.lisMov.listaTipoConMovimiento();

    this.unitTypeCallback = this.lisUni.listaTipoUnidad();
  }

  /*
   *Reiniciar los campos.
   */
  cleanStorage(codigo: String) {
    this.stoF=codigo;
    this.stoU=codigo;
  }
  cleanLine(codigo: String) {
    this.linF = codigo;
    this.linU = codigo;
  }
  cleanCategory(codigo: String) {
    this.cateF=codigo;
    this.cateU=codigo;
  }
  cleanProvider(codigo: String) {
    this.provF = codigo;
    this.provU = codigo;
  }
  cleanMove(codigo: String) {
    this.move = codigo;
  }
  cleanUnit(codigo: String) {
    this.unit = codigo;
  }

  clearFields() {
    this.cleanStorage(null);
    this.cleanLine(null);
    this.cleanCategory(null);
    this.cleanProvider(null);
    this.cleanMove(null);
    this.cleanUnit(null);

    this.send = "";
    this.datU = {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate()
    };
    this.maxDate = {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate()
    };
    this.datF = {
      year: now.getFullYear(),
      month: 1,
      day: 1
    };
    this.itmF = '';
    this.itmU = '';
  }

  /*
   *Regresar a la pantalla anterior.
   */
  goBack(): void {
    this.router.navigate([`app/reportes/dashboard`]);
  }

  /*
   *Se validan los campos del formulario y se envían los datos de filtrado a la siguiente vista, o al servicio de PDF.
   */
  accept() {
    let a = this.listCompVen.value;
    let dF = a.dateF.year.toString() + '-' + a.dateF.month.toString() + '-' + a.dateF.day.toString();
    let dU = a.dateU.year.toString() + '-' + a.dateU.month.toString() + '-' + a.dateU.day.toString();

    this.formService.markFormGroupTouched(this.listCompVen);

    if (this.listCompVen.valid) {
      if (a.sendTo == 'Listado') {
        this.flag = true;
        this.listCompVen.controls.dateF.setValue(dF);
        this.listCompVen.controls.dateU.setValue(dU);
        this.router.navigate([`${this.router.url}/detalle`], {
          queryParams: this.listCompVen.value
        });
      } else if (a.sendTo == 'PDF') {
        let out: RepAdmVentasVsComprasOut;
        let det: RepAdmVentasVsCompraIn;
        det = new RepAdmVentasVsCompraIn();
        det.Articulo_D = a.itemF;
        det.Articulo_h = a.itemU;
        det.Fecha_D = dF;
        det.Fecha_h = dU;
        det.Almacen_D = a.storageF;
        det.Almacen_d = a.storageU;
        det.Linea_D = a.lineF;
        det.Linea_h = a.lineU;
        det.Categoria_D = a.categoryF;
        det.Categoria_h = a.categoryU;
        det.Proveedor_D = a.providerF;
        det.Proveedor_h = a.providerU;
        det.ConMovimiento = a.movements;
        det.TipoUnidad = a.unitType;
        this.global.showLoading();
        let msjerror; 
        this.repAdmComvsVen.repCxP(det).subscribe(res => {
          if (res.RepVentasVsCompras.Error.toString() == ""){
            msjerror = "No hay información que mostrar";
          }else{
            msjerror = res.RepVentasVsCompras.Error.toString();
          }
            out = res;
            this.global.hideLoading();
            if ( res.RepVentasVsCompras.Error || res.RepVentasVsCompras.Documeto == null || res.RepVentasVsCompras.Documeto.length == 0) {
              swal(
                res.RepVentasVsCompras.Error? "ERROR":"INFO",
                msjerror,
                res.RepVentasVsCompras.Error? "error":"info")
                .then((value) => {
                  if (value || value == null) {}
                });
            } else {
              this.pdf.pdfComprasVsVentas(det, out);
            }
          },
          error => {})
      }
    } else {
      swal("", "Debe seleccionar una opción válida.", "info")
        .then((value) => {
          if (value || value == null) {}
        });
    }
  }

  /*
   *Registra los cambios en los combos.
   */
  changeStorage(code: String) {
    this.stoU = code;
  }
  changeLine(code: String) {
    this.linU = code;
  }
  changeCategory(code: String) {
    this.cateU = code;
  }
  changeProvider(code: String) {
    this.provU = code;
  }
}
