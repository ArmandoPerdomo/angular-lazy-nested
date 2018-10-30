import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Globals } from '../../../../../core/services/globals.service';
import { Location } from '@angular/common';
import { RepAdmPrecioxStockServices } from '../../../../../core/services/ventas/repAdmPrecioxStock.service';
import { ActivatedRoute } from '@angular/router';
import { RepAdmPrecioxStockOut } from '../../../../../abstract/DTO/out/reportesAdmVentas/repAdmPrecioxStockOut/repAdmPrecioxStockOut';
import { Art } from '../../../../../abstract/DTO/out/reportesAdmVentas/repAdmPrecioxStockOut/Art';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImgArticuloComponent } from './img-articulo/img-articulo.component';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { RepAdmPrecioxStockIn } from '../../../../../abstract/DTO/in/reportesAdmVentas/RepAdmPrecioxStockIn';
import { PdfListadoPrecioStockService } from '../../../../../core/services/exportables/administrativo/ventas/listado-precio-stock/pdf-listado-precio-stock.service';

@Component({
  selector: 'app-reporte-detalle-listado-precio-stock',
  templateUrl: './reporte-detalle-listado-precio-stock.component.html',
  styleUrls: ['./reporte-detalle-listado-precio-stock.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReporteDetalleListadoPrecioStockComponent implements OnInit {
  title: String;
  //? 
  repDev: Subscription; 
  @ViewChild(DatatableComponent) table: DatatableComponent;

  //?Formato de entrada de datos.
  detIn: RepAdmPrecioxStockIn = new RepAdmPrecioxStockIn();

  //? summary table
  enableSummary = true;
  summaryPosition = 'bottom';

  //?Listado.
  detOut: RepAdmPrecioxStockOut;
  rows: Array < Art > = [];
  temp = [];
  selected = [];

  constructor(
    private location: Location,
    public repAdm: RepAdmPrecioxStockServices,
    public route: ActivatedRoute,
    private modalService: NgbModal, 
    public global: Globals,
    public pdf: PdfListadoPrecioStockService
  ) { }

 

  ngOnInit() {
    this.table.messages.emptyMessage="No hay información para mostrar";
    this.title = 'Lista de precios stock';
     //?Recuperar la información enviada por parámetro.
     this.route.queryParams.subscribe(params => {
      this.detIn.Co_art_D = params.codeF;
      this.detIn.Co_art_h = params.codeU;
      this.detIn.Linea_D = params.lineF;
      this.detIn.Linea_h = params.lineU;
      this.detIn.Sub_linea_D = params.sublineF;
      this.detIn.Sub_linea_h = params.sublineU;
      this.detIn.Categoria_D = params.categoryF;
      this.detIn.Categoria_h = params.categoryU;
      this.detIn.Precio = params.price;
    });
  
    this.fillTable(this.detIn);
  }

  

  goBack(): void {
    this.location.back();
  }

  fillTable(rep: RepAdmPrecioxStockIn): void {
    this.global.showLoading();
    let msjerror; 

    this.repDev = this.repAdm.repDev(rep).subscribe(res => {
    
        this.detOut = res;
        if (res.RepPrecioxStockResult.Error.toString() == ""){
          msjerror = "No hay información que mostrar";
        }else{
          msjerror = res.RepPrecioxStockResult.Error.toString();
        } 

        if (res.RepPrecioxStockResult.Error || res.RepPrecioxStockResult.Art.length == 0 || res.RepPrecioxStockResult.Art == null) {
          swal(  
            res.RepPrecioxStockResult.Error? "ERROR":"INFO",
            msjerror,
            res.RepPrecioxStockResult.Error? "error":"info")
            .then((value) => {
              if (value || value == null) {
                this.goBack();
                this.global.hideLoading();
              }
            });
    
        } else {
          let rep = this.detOut.RepPrecioxStockResult;

          this.rows = rep.Art;
          this.temp = rep.Art;

          this.global.hideLoading();
          
        }
       
       
      },
      error => {});
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(x =>{
      return x.Art_des.toLowerCase().indexOf(val)!== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  sumarMonto(tipoPago: any, monto: any = 'Monto'): Number {
    let acum: Number = 0;
    tipoPago.forEach(element => {
      acum += element[monto];
  });
  return acum
}

  open() {
    setTimeout(()=>{
       const modalRef = this.modalService.open(ImgArticuloComponent);
       modalRef.componentInstance.desc_art = this.selected[0].Art_des;
       modalRef.componentInstance.co_art = this.selected[0].Co_art;
    },300)
  }


  createPdf(){
    this.global.showLoading();
    this.pdf.pdfListadoPrecioStock(this.rows);
    this.global.hideLoading()
  }

  ngOnDestroy(){
    this.global.hideLoading();
    this.repDev.unsubscribe();
  }

  

}
