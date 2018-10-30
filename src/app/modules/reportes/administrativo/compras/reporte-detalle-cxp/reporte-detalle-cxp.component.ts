import { Component, OnInit, ViewChild, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Globals } from '../../../../../core/services/globals.service';
import { ActivatedRoute } from '@angular/router';
import { RepAdmCxPPorProveedorService } from '../../../../../core/services/compras/repAdmCxPPorProveedor.service';
import { RepAdmCxPPorProveedorIn } from '../../../../../abstract/DTO/in/reporteAdmCompras/repAdmCxPPorProveedorIn';
import { RepAdmCxPPorProveedorOut } from '../../../../../abstract/DTO/out/reportesAdmCompras/repAdmCxPPorProveedor/repAdmCxPPorProveedorOut';
import { CxC } from "../../../../../abstract/DTO/out/reportesAdmCompras/repAdmCxPPorProveedor/CxPPorProveedorResult/CxC";
import { PdfCxpProveedorService } from '../../../../../core/services/exportables/administrativo/compras/cxp-proveedor/pdf-cxp-proveedor.service';
import { Proveedor } from '../../../../../abstract/DTO/out/reportesAdmCompras/repAdmCxPPorProveedor/CxPPorProveedorResult/Proveedor';
import * as cloneDeep from 'lodash/cloneDeep';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reporte-detalle-cxp',
  templateUrl: './reporte-detalle-cxp.component.html',
  styleUrls: ['./reporte-detalle-cxp.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReporteDetalleCxpComponent implements OnInit, OnDestroy {
  titlCxp: String;
  env = '';

  pdfObj = null;
  prueba = "hhh";
  titulo_detalle = "";
  titulo = "";

  documentoDespacho: Boolean = false;
  mostrarText: Boolean = false;

  // -------- REPORTE ----------
  detalleReport: RepAdmCxPPorProveedorOut = new RepAdmCxPPorProveedorOut;
  outPdf: RepAdmCxPPorProveedorOut = new RepAdmCxPPorProveedorOut;
  repDev :Subscription;

  funder = [];
  calculated = [];
  pending = [];
  groups = [];
  
  editing = {};  

  @ViewChild('myTable') table: any;
  constructor(private  location: Location, public repAdm: RepAdmCxPPorProveedorService ,public global: Globals,
    private route: ActivatedRoute, public pdf: PdfCxpProveedorService) {
    
    
   }

   goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.titlCxp = 'Reporte CxP proveedor';
    this.env = 'PDF';
    let detalleReportin: RepAdmCxPPorProveedorIn;
    this.route.queryParams.subscribe(params => {
         let numD = parseInt(params["numD"]);
         let numh = parseInt(params["numH"]);

         detalleReportin = new RepAdmCxPPorProveedorIn();
         detalleReportin.Nro_doc_D=  numD;
         detalleReportin.Nro_doc_H=  numh;
         detalleReportin.Tipo_doc = params["tipo"]; 
         detalleReportin.Fec_emision_D = params['dateD'];
         detalleReportin.Fec_emision_H = params['dateH'];
         detalleReportin.Co_prov_D = params["proveedorD"];
         detalleReportin.Co_prov_H = params["proveedorH"];
         detalleReportin.Condicion = params["condicion"];
         detalleReportin.Co_mone = params["moneda"];

         detalleReportin.Co_seg_D = params["segmentoD"];
         detalleReportin.Co_seg_H = params["segmentoH"];
         detalleReportin.Co_zon_D = params["zonaD"];
         detalleReportin.Co_zon_H = params["zonaH"];
      
        });
        this.metRep(detalleReportin);
  }

  metRep(repformin: RepAdmCxPPorProveedorIn): void {
    $('section').css('visibility','hidden');
    this.global.showLoading();
    var msjerror : string = "";
    this.repDev = this.repAdm.repDev(repformin).subscribe( dev => {
      if(dev.CxPPorProveedorResult.Error.toString()==""){
        msjerror = "No hay información para mostrar"
      }else{
        msjerror =dev.CxPPorProveedorResult.Error.toString();
      }

      if(dev.CxPPorProveedorResult.Error || dev.CxPPorProveedorResult.Proveedor.length==0){

        swal(
        dev.CxPPorProveedorResult.Error? "ERROR":"INFO",
        msjerror,
        dev.CxPPorProveedorResult.Error? "error":"info")
        .then((value) => {
          if (value || value==null) {
            this.global.hideLoading();
          }
        });


  }else{
          this.outPdf = cloneDeep(dev);
          this.detalleReport = dev;
          this.createArrayOut();
          this.global.hideLoading();
        }
      },
      error => {
      }
    );
  }


  
  toggleExpandGroup(group) {
    this.table.groupHeader.toggleExpandGroup(group);
  }  

  onDetailToggle(event) {

  }
  getGroupRowHeight(group, rowHeight) {
    let style = {};

    style = {
      height: (group.length * 40) + 'px',
      width: '100%'
    };

    return style;
  }

  /*@HostListener('window:resize', ['$event'])
  onResize(event) {
    event.target.innerWidth;
   // this.tablawidth();
  }*/


  createArrayOut(){
    let proveedor = new Array<Proveedor>();
    this.detalleReport.CxPPorProveedorResult.Proveedor.forEach(element => {
      let rows = new Array<CxC>();
      let cxc = new CxC(".",".",".",".","Total Cliente :",null,
      this.getNetoAcumCxC(element.CxC),
      this.getSaldoAcumCXC(element.CxC));  
      element.CxC.unshift(cxc);
      proveedor.push(element);
    });
    this.detalleReport.CxPPorProveedorResult.Proveedor = proveedor;

  }
  



  getNetoAcum(): number {
    let acumneto: number = 0;
    if ( this.detalleReport.CxPPorProveedorResult.Proveedor.length != 0){
      this.detalleReport.CxPPorProveedorResult.Proveedor.forEach(element => {
        element.CxC.forEach(el => {
          acumneto += +el.Monto_net;
        });
      });
    }
      return acumneto;

  }
  
  
  getSaldoAcum(): number {
  let acumsaldo: number = 0;
  if ( this.detalleReport.CxPPorProveedorResult.Proveedor.length != 0){
    this.detalleReport.CxPPorProveedorResult.Proveedor.forEach(element => {
      element.CxC.forEach(el => {
        acumsaldo += +el.Saldo;
      });
        });
      
      }
  return acumsaldo;
    }

  getNetoAcumCxC(cxc :CxC[]): number {
    let acumneto: number = 0;
    cxc.forEach(element => {
      if (!element.Anulado){
        acumneto += +element.Monto_net;
      }   
    });
    return acumneto;

  }
  
  getSaldoAcumCXC(cxc :CxC[]): number {
    let acumsaldo: number = 0;
    cxc.forEach(element => {
      if (!element.Anulado){
        acumsaldo+= +element.Saldo;
      }
    });
    return acumsaldo;
  }

  
  public createPdf() {
    this.global.showLoading();
    this.pdf.PdfCxP(this.outPdf);
    this.global.hideLoading();
  }
  
  ngOnDestroy(){
    this.global.hideLoading();
    this.repDev.unsubscribe();
  }

}
