import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RepAdmVentasVsCompraIn } from '../../../../../abstract/DTO/in/reportesAdmInventario/repAdmVentasVsComprasIn';
import { RepAdmVentasVsComprasService } from '../../../../../core/services/inventario/repAdmVentasVsCompras.service';
import { RepAdmVentasVsComprasOut } from '../../../../../abstract/DTO/out/reportesAdmInventario/repAdmVentasVsCompras/repAdmVentasVsComprasOut';
import { MonedaConstPipe } from '../../../../../core/pipes/moneda-const.pipe';
import { Globals } from '../../../../../core/services/globals.service';
import { Documeto } from '../../../../../abstract/DTO/out/reportesAdmInventario/repAdmVentasVsCompras/Documento/Documeto';
import { PdfComprasVsVentasService } from '../../../../../core/services/exportables/administrativo/inventario/compras-vs-ventas/pdf-compras-vs-ventas.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listado-compras-vs-ventas',
  templateUrl: './listado-compras-vs-ventas.component.html',
  styleUrls: ['./listado-compras-vs-ventas.component.css']
})
export class ListadoComprasVsVentasComponent implements OnInit, OnDestroy {

  constructor(
    private location: Location,
    public route: ActivatedRoute,
    public repAdmComvsVen: RepAdmVentasVsComprasService,
    public pipe: MonedaConstPipe,
    public pdf: PdfComprasVsVentasService,
    public global: Globals) {}

  //?Title.
  titListCompVen: String;

  //? 
  repDev: Subscription; 
  
  //?Loader.
  loading: boolean = false;
  loadingIndicator: boolean = true;

  //?Formato de entrada de datos.
  det: RepAdmVentasVsCompraIn = new RepAdmVentasVsCompraIn();

  //?Listado.
  listOut: RepAdmVentasVsComprasOut;
  enableSummary = true;
  summaryPosition = 'bottom';
  totInicial1: Number;
  totCompra1: Number;
  totSalida1: Number;
  totVenta1: Number;
  totEntrada1: Number;
  totFinal1: Number;
  totCompra2: Number;
  totSalida2: Number;
  totVenta2: Number;
  totEntrada2: Number;
  rows: Array < Documeto > = [];

  //?: Acumuladores para totales.
  aStIn: Number;
  aC: Number;
  aS: Number;
  aV: Number;
  aE: Number;
  aStFi: Number;
  aGO1: Number;

  ngOnInit() {
    //?Inicialización.
    this.titListCompVen = 'Compras vs. ventas';

    //?Recuperar la información enviada por parámetro.
    this.route.queryParams.subscribe(params => {
      this.det.Articulo_D = params.itemF;
      this.det.Articulo_h = params.itemU;
      this.det.Fecha_D = params.dateF;
      this.det.Fecha_h = params.dateU;
      this.det.Almacen_D = params.storageF;
      this.det.Almacen_d = params.storageU;
      this.det.Linea_D = params.lineF;
      this.det.Linea_h = params.lineU;
      this.det.Categoria_D = params.categoryF;
      this.det.Categoria_h = params.categoryU;
      this.det.Proveedor_D = params.providerF;
      this.det.Proveedor_h = params.providerU;
      this.det.ConMovimiento = params.movements;
      this.det.TipoUnidad = params.unitType;
    });

    this.aStIn = 0;
    this.aC = 0;
    this.aS = 0;
    this.aV = 0;
    this.aE = 0;
    this.aStFi = 0;
    this.aGO1 = 0;
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
    this.pdf.pdfComprasVsVentas(this.det, this.listOut);
    this.global.hideLoading();
  }

  fillTable(rep: RepAdmVentasVsCompraIn): void {
    this.loading = true;
    this.global.showLoading();
    let msjerror 
    this.repDev = this.repAdmComvsVen.repCxP(rep).subscribe(res => {
        this.listOut = res;
        if (res.RepVentasVsCompras.Error.toString() == ""){
          msjerror = "No hay información que mostrar";
        }else{
          msjerror = res.RepVentasVsCompras.Error.toString();
        }
         
          if ( res.RepVentasVsCompras.Error || res.RepVentasVsCompras.Documeto == null || res.RepVentasVsCompras.Documeto.length == 0) {
            swal(
              res.RepVentasVsCompras.Error? "ERROR":"INFO",
              msjerror,
              res.RepVentasVsCompras.Error? "error":"info")
              .then((value) => {
                if (value || value == null) {
                  this.global.hideLoading();
                }
              });
        } else {
          this.loadingIndicator = false;
          let rep = this.listOut.RepVentasVsCompras;
          rep.Documeto.forEach(a => {
            this.aStIn = +this.aStIn + +a.StockIni;
            this.aC = +this.aC + +a.Compras;
            this.aS = +this.aS + +a.Salidas;
            this.aV = +this.aV + +a.Ventas;
            this.aE = +this.aE + +a.entradas;
            this.aStFi = +this.aStFi + +a.StockFinal;
            this.aGO1 = +this.aGO1 + +a.StockG01;
          });
          this.rows = rep.Documeto;
          this.totInicial1 = rep.TotInicial1;
          this.totCompra1 = rep.TotCompra1;
          this.totCompra2 = rep.TotCompra2;
          this.totVenta1 = rep.TotVenta1;
          this.totVenta2 = rep.TotVenta2;
          this.totEntrada1 = rep.TotEntrada1;
          this.totEntrada2 = rep.TotEntrada2;
          this.totSalida1 = rep.TotSalida1;
          this.totSalida2 = rep.TotSalida2;
          this.totFinal1 = rep.TotFinal1;
          setTimeout(() => {
            this.loadingIndicator = false;
          }, 1500)
        }
        this.loading = false;
        this.global.hideLoading();
      },
      error => {

      });
  }

  ngOnDestroy(){
    this.global.hideLoading();
    this.repDev.unsubscribe();
  }
}
