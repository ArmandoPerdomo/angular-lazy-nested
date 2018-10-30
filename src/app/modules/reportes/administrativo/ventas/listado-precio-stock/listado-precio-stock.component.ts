import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ListaArticulosCategoriaService } from '../../../../../core/services/listas/lista-articulos-categoria.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ListaArticulosLineaService } from '../../../../../core/services/listas/lista-articulos-linea.service';
import { RepAdmPrecioxStockServices } from '../../../../../core/services/ventas/repAdmPrecioxStock.service';
import { ListaArticulosSublineaService } from '../../../../../core/services/listas/lista-articulos-sublinea.service';
import { ListaArticulosCategoriaIn } from '../../../../../abstract/DTO/in/listaArticulosCategoriaIn';
import { ListaArticulosSublineaIn } from '../../../../../abstract/DTO/in/listaArticulosSublineaIn';
import { ListaArticulosLineaIn } from '../../../../../abstract/DTO/in/listaArticulosLineaIn';
import { ListaArticulosService } from '../../../../../core/services/listas/lista-articulos.service';
import { ListaArticulosIn } from '../../../../../abstract/DTO/in/listaArticulosIn';
import { FormControlService } from '../../../../../core/services/form-control.service';
import { Router } from '@angular/router';
import { Globals } from '../../../../../core/services/globals.service';
import { RepAdmPrecioxStockOut } from '../../../../../abstract/DTO/out/reportesAdmVentas/repAdmPrecioxStockOut/repAdmPrecioxStockOut';
import { ListaPrecioStockService } from '../../../../../core/services/listas/section-mock/lista-precio-stock.service';
import { RepAdmPrecioxStockIn } from '../../../../../abstract/DTO/in/reportesAdmVentas/RepAdmPrecioxStockIn';
import { PdfListadoPrecioStockService } from '../../../../../core/services/exportables/administrativo/ventas/listado-precio-stock/pdf-listado-precio-stock.service';

@Component({
  selector: 'app-listado-precio-stock',
  templateUrl: './listado-precio-stock.component.html',
  styleUrls: ['./listado-precio-stock.component.css']
})
export class ListadoPrecioStockComponent implements OnInit {
  constructor(
    public lisCod: ListaArticulosService,
    public lisLin: ListaArticulosLineaService,
    public lisSub: ListaArticulosSublineaService,
    public lisCat: ListaArticulosCategoriaService,
    public listPri: ListaPrecioStockService,
    public repAdm: RepAdmPrecioxStockServices,
    public formService: FormControlService,
    public router: Router,
    public pdf: PdfListadoPrecioStockService,
    public global: Globals) {
   }

    title: string;
    ListaPrecioStock: FormGroup;

    //?Requests callbacks.
    codeCallback: Observable < any > ;
    lineCallback: Observable < any > ;
    sublineCallback: Observable < any > ;
    categoryCallback: Observable < any > ;
    priceCallback: Observable < any > ;

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
    pri: String;

  

  ngOnInit() {
    this.title = 'Lista de precios stock';

    this.ListaPrecioStock = new FormGroup ({
      codeF: new FormControl(''),
      codeU: new FormControl(''),
      lineF: new FormControl(''),
      lineU: new FormControl(''),
      sublineF: new FormControl(''),
      sublineU: new FormControl(''),
      categoryF: new FormControl(''),
      categoryU: new FormControl(''),
      price: new FormControl(''),
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
    
     this.priceCallback = this.listPri.listaPrecio();
 
  }


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
    cleanPrice(codigo: String) {
      this.pri=codigo;
    }


    clearFields() {
      this.cleanCode(null);
      this.cleanLine(null);
      this.cleanSubLine(null);
      this.cleanCategory(null);
      this.cleanPrice(null);
    }


    goBack(): void {
      this.router.navigate([`app/reportes/dashboard`]);
    }

    accept() {
      let a = this.ListaPrecioStock.value;

      this.formService.markFormGroupTouched(this.ListaPrecioStock);

      if (this.ListaPrecioStock.valid) {
        if (a.sendTo == 'Listado') {
          this.router.navigate([`${this.router.url}/detalle`], {
            queryParams: this.ListaPrecioStock.value
          });
        } else if (a.sendTo == 'PDF') {
          let out: RepAdmPrecioxStockOut;
          let det: RepAdmPrecioxStockIn = new RepAdmPrecioxStockIn();

          det.Co_art_D = a.codeF;
          det.Art_des_h = a.codeU;
          det.Linea_D = a.lineF;
          det.Linea_h = a.lineU;
          det.Sub_linea_D = a.sublineF;
          det.Sub_linea_h = a.sublineU;
          det.Categoria_D = a.categoryF;
          det.Categoria_h = a.categoryU;
          det.Precio = a.price;

          this.global.showLoading();
          let msjerror
          this.repAdm.repDev(det).subscribe(res => {
           
              out = res;
        
              if (res.RepPrecioxStockResult.Error.toString() == ""){
                msjerror = "No hay información que mostrar";
              }else{
                msjerror = res.RepPrecioxStockResult.Error.toString();
              } 
      
              if (res.RepPrecioxStockResult.Error || res.RepPrecioxStockResult.Art.length == 0) {
                swal(  
                  res.RepPrecioxStockResult.Error? "ERROR":"INFO",
                  msjerror,
                  res.RepPrecioxStockResult.Error? "error":"info")
                  .then((value) => {
                    if (value || value == null) {
                      this.global.hideLoading();
                    }
                  });
              } else {
               this.pdf.pdfListadoPrecioStock(res.RepPrecioxStockResult.Art)
              this.global.hideLoading();
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