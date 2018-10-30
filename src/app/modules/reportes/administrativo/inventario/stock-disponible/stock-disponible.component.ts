import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ListaArticulosService } from '../../../../../core/services/listas/lista-articulos.service';
import { ListaArticulosLineaService } from '../../../../../core/services/listas/lista-articulos-linea.service';
import { ListaArticulosSublineaService } from '../../../../../core/services/listas/lista-articulos-sublinea.service';
import { ListaArticulosCategoriaService } from '../../../../../core/services/listas/lista-articulos-categoria.service';
import { FormControlService } from '../../../../../core/services/form-control.service';
import { Router } from '@angular/router';
import { Globals } from '../../../../../core/services/globals.service';
import { RepAdmStockDisponibleService } from '../../../../../core/services/inventario/repAdmStockDisponible.service';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ListaArticulosIn } from '../../../../../abstract/DTO/in/listaArticulosIn';
import { ListaArticulosSublineaIn } from '../../../../../abstract/DTO/in/listaArticulosSublineaIn';
import { ListaArticulosLineaIn } from '../../../../../abstract/DTO/in/listaArticulosLineaIn';
import { ListaArticulosCategoriaIn } from '../../../../../abstract/DTO/in/listaArticulosCategoriaIn';
import { RepAdmStockDisponibleOut } from '../../../../../abstract/DTO/out/reportesAdmInventario/repAdmStockDisponible/repAdmStockDisponibleOut';
import { RepAdmStockDisponibleIn } from '../../../../../abstract/DTO/in/reportesAdmInventario/repAdmStockDisponibleIn';
import { PdfStockDisponibleService } from '../../../../../core/services/exportables/administrativo/inventario/stock-disponible/pdf-stock-disponible.service';

@Component({
  selector: 'app-stock-disponible',
  templateUrl: './stock-disponible.component.html',
  styleUrls: ['./stock-disponible.component.css']
})
export class StockDisponibleComponent implements OnInit {

  constructor(
    public lisCod: ListaArticulosService,
    public lisLin: ListaArticulosLineaService,
    public lisSub: ListaArticulosSublineaService,
    public lisCat: ListaArticulosCategoriaService,
    public formService: FormControlService,
    public router: Router,
    public pdf: PdfStockDisponibleService,
    public global: Globals,
    public repAdmStockDis: RepAdmStockDisponibleService) {}

  //?Title.
  titListStock: String;

  //?Requests callbacks.
  codeCallback: Observable < any > ;
  lineCallback: Observable < any > ;
  sublineCallback: Observable < any > ;
  categoryCallback: Observable < any > ;

  //?Formgroup.
  listStock: FormGroup;

  //?Models
  send = '';
  codF: String;
  codU: String;
  linF: String;
  linU: String;
  subF: String;
  subU: String;
  cateF: String;
  cateU: String;

  ngOnInit() {
    //?Inicialización.
    this.titListStock = 'Stock disponible';

    //?Creación del FormGroup.
    this.listStock = new FormGroup({
      codeF: new FormControl(''),
      codeU: new FormControl(''),
      lineF: new FormControl(''),
      lineU: new FormControl(''),
      sublineF: new FormControl(''),
      sublineU: new FormControl(''),
      categoryF: new FormControl(''),
      categoryU: new FormControl(''),
      sendTo: new FormControl('', [Validators.required]),
    });

    //?Providers requests.
    let lcod: ListaArticulosIn = new ListaArticulosIn();
    this.codeCallback = this.lisCod.listaArticulos(lcod);

    let llin: ListaArticulosLineaIn = new ListaArticulosLineaIn();
    this.lineCallback = this.lisLin.listaArticulosLinea(llin);

    let lsub: ListaArticulosSublineaIn = new ListaArticulosSublineaIn();
    this.sublineCallback = this.lisSub.listaArtSublinea(lsub);

    let lcat: ListaArticulosCategoriaIn = new ListaArticulosCategoriaIn();
    this.categoryCallback = this.lisCat.listaCategoria(lcat);
  }

  /*
   *Reiniciar los campos.
   */
  cleanCode(codigo: String) {
    this.codF=codigo;
    this.codU=codigo;
  }
  cleanLine(codigo: String) {
    this.linF = codigo;
    this.linU = codigo;
  }
  cleanSubLine(codigo: String) {
    this.subF = codigo;
    this.subU = codigo;
  }
  cleanCategory(codigo: String) {
    this.cateF=codigo;
    this.cateU=codigo;
  }


  clearFields() {
    this.cleanCode(null);
    this.cleanLine(null);
    this.cleanSubLine(null);
    this.cleanCategory(null);
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
    let a = this.listStock.value;

    this.formService.markFormGroupTouched(this.listStock);

    if (this.listStock.valid) {
      if (a.sendTo == 'Listado') {
        this.router.navigate([`${this.router.url}/detalle`], {
          queryParams: this.listStock.value
        });
      } else if (a.sendTo == 'PDF') {
        let out: RepAdmStockDisponibleOut;
        let det: RepAdmStockDisponibleIn;
        det = new RepAdmStockDisponibleIn();
        det.Co_art_D = a.codeF;
        det.Co_art_H = a.codeU;
        det.Linea_D = a.lineF;
        det.Linea_h = a.lineU;
        det.Sub_linea_D = a.sublineF;
        det.Sub_linea_h = a.sublineU;
        det.Categoria_D = a.categoryF;
        det.Categoria_h = a.categoryU;
        this.global.showLoading();
        let msjerror
        this.repAdmStockDis.repCxP(det).subscribe(res => {
            out = res;
            this.global.hideLoading();
            if (res.RepStockDisponibleResult.Error.toString() == ""){
              msjerror = "No hay información que mostrar";
            }else{
              msjerror = res.RepStockDisponibleResult.Error.toString();
            } 
    
            if (res.RepStockDisponibleResult.Error || res.RepStockDisponibleResult.Stock.length == 0) {
              swal(  
                res.RepStockDisponibleResult.Error? "ERROR":"INFO",
                msjerror,
                res.RepStockDisponibleResult.Error? "error":"info")
                .then((value) => {
                  if (value || value == null) {
                    this.global.hideLoading();
                  }
                });
            } else {
              this.pdf.pdfStockDisponible(det, out);
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

  changeCode(code: String) {
    this.codU = code;
  }
  changeLine(code: String) {
    this.linU = code;
  }
  changeSubline(code: String) {
    this.subU = code;
  }
  changeCategory(code: String) {
    this.cateU = code;
  }
}

