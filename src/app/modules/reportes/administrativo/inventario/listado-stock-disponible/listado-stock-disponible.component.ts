import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MonedaConstPipe } from '../../../../../core/pipes/moneda-const.pipe';
import { Globals } from '../../../../../core/services/globals.service';
import { RepAdmStockDisponibleService } from '../../../../../core/services/inventario/repAdmStockDisponible.service';
import { RepAdmStockDisponibleIn } from '../../../../../abstract/DTO/in/reportesAdmInventario/repAdmStockDisponibleIn';
import { RepAdmStockDisponibleOut } from '../../../../../abstract/DTO/out/reportesAdmInventario/repAdmStockDisponible/repAdmStockDisponibleOut';
import { Stock } from '../../../../../abstract/DTO/out/reportesAdmInventario/repAdmStockDisponible/RepStockDisponibleResult/Stock';
import { PdfStockDisponibleService } from '../../../../../core/services/exportables/administrativo/inventario/stock-disponible/pdf-stock-disponible.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listado-stock-disponible',
  templateUrl: './listado-stock-disponible.component.html',
  styleUrls: ['./listado-stock-disponible.component.css']
})
export class ListadoStockDisponibleComponent implements OnInit, OnDestroy {

  constructor(
    private location: Location,
    public route: ActivatedRoute,
    public repAdmStockDis: RepAdmStockDisponibleService,
    public pipe: MonedaConstPipe,
    public pdf: PdfStockDisponibleService,
    public global: Globals) {}

  //?Title.
  titListStock: String;

  //? 
  repDev: Subscription; 

  //?Loader.
  loading: boolean = false;
  loadingIndicator: boolean = true;

  //?Formato de entrada de datos.
  det: RepAdmStockDisponibleIn = new RepAdmStockDisponibleIn();

  //?Listado.
  listOut: RepAdmStockDisponibleOut;
  rows: Array < Stock > = [];

  ngOnInit() {
    //?Inicialización.
    this.titListStock = 'Stock disponible';

    //?Recuperar la información enviada por parámetro.
    this.route.queryParams.subscribe(params => {
      this.det.Co_art_D = params.codeF;
      this.det.Co_art_H = params.codeU;
      this.det.Linea_D = params.lineF;
      this.det.Linea_h = params.lineU;
      this.det.Sub_linea_D = params.sublineF;
      this.det.Sub_linea_h = params.sublineU;
      this.det.Categoria_D = params.categoryF;
      this.det.Categoria_h = params.categoryU;
    });
    this.fillTable(this.det);
  }

  /*
   *Regresar a la pantalla anterior.
   */
  goBack(): void {
    this.location.back();
  }

  accept() {
    this.global.showLoading();
    this.pdf.pdfStockDisponible(this.det, this.listOut);
    this.global.hideLoading();
  }

  fillTable(rep: RepAdmStockDisponibleIn): void {
    this.global.showLoading();
    let msjerror; 
    this.loading = true;
    this.repDev = this.repAdmStockDis.repCxP(rep).subscribe(res => {
        this.listOut = res;
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
                this.goBack();
                this.global.hideLoading();
              }
            });
    
        } else {
          this.loadingIndicator = false;
          let rep = this.listOut.RepStockDisponibleResult;
          this.rows = rep.Stock;
          setTimeout(() => {
            this.loadingIndicator = false;
          }, 1500)
        }
        this.loading = false;
        this.global.hideLoading();
      },
      error => {});
  }

  ngOnDestroy(){
    this.global.hideLoading();
    this.repDev.unsubscribe();
  }
}