import { Component, OnInit, ElementRef, ViewChild,ViewEncapsulation, AfterViewInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RepAdmFormatosCxCClientesOut } from "../../../../../abstract/DTO/out/reportesAdmVentas/repAdmFormatosCxcClientesOut/repAdmFormatosCxcClientesOut";
import { RepAdmFormatoCxCClientesService } from "../../../../../core/services/ventas/repAdmFormatosCxcClientes.service";
import { Globals } from "../../../../../core/services/globals.service";
import { RepAdmFormatosCxcClientesIn } from "../../../../../abstract/DTO/in/reportesAdmVentas/repAdmFormatosCxCClientesIn";
import { CxC } from "../../../../../abstract/DTO/out/reportesAdmVentas/repAdmFormatosCxcClientesOut/RepCxCPorClienteResult/CxC";
import { PdfCxcClienteService } from '../../../../../core/services/exportables/administrativo/ventas/cxc-cliente/pdf-cxc-cliente.service';
import { Clientes } from '../../../../../abstract/DTO/out/reportesAdmVentas/repAdmFormatosCxcClientesOut/RepCxCPorClienteResult/Clientes';
import * as cloneDeep from 'lodash/cloneDeep';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reporte-cxc-detalle',
  templateUrl: './reporte-cxc-detalle.component.html',
  styleUrls: ['./reporte-cxc-detalle.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ReporteCxCDetalleComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('content') content: ElementRef;
 
  pdfObj = null;
  prueba = "hhh";
  titulo_detalle = "";
  titulo = "";

  documentoDespacho: Boolean = false;
  mostrarText: Boolean = false;

  // -------- REPORTE ----------
  repDev :Subscription;
  detalleReport: RepAdmFormatosCxCClientesOut = new RepAdmFormatosCxCClientesOut;
  outPdf: any= new RepAdmFormatosCxCClientesOut;
  loadingIndicator: boolean = true;
  funder = [];
  calculated = [];
  pending = [];
  groups = [];
  
  editing = {};  



 // -------- SUMARY ----------
  enableSummary = true;
  summaryPosition = 'top';
  @ViewChild('myTable') table: any;
  constructor(
    private  location: Location, 
    public repAdm: RepAdmFormatoCxCClientesService,
    public global: Globals,
    private route: ActivatedRoute, 
    public pdf: PdfCxcClienteService) {


    }

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    let detalleReportin: RepAdmFormatosCxcClientesIn;
    this.route.queryParams.subscribe(params => {
        let numeroDoc = parseInt(params['numero']);
        detalleReportin = new RepAdmFormatosCxcClientesIn();
        detalleReportin.Nro_doc_D = numeroDoc;
        detalleReportin.Nro_doc_H = numeroDoc;
        detalleReportin.Nro_doc_H = numeroDoc;
        detalleReportin.Fec_emis_D = params['dateD'];
        detalleReportin.Fec_emis_H = params['dateH'];
        detalleReportin.Co_cli_D = params['clienteD'];
        detalleReportin.Co_cli_H = params['clienteH'];
        detalleReportin.Co_ven_D = params['vendedorD'];
        detalleReportin.Co_ven_H = params['vendedorH'];
        detalleReportin.Condicion = params['condicion'];
        detalleReportin.Tipo_doc = 'FACT';
        detalleReportin.Co_mone = params['moneda'];
        detalleReportin.Co_zon_D = params['zonaD'];
        detalleReportin.Co_zon_H = params['zonaH'];
        detalleReportin.Co_seg_D = params['segmentoD'];
        detalleReportin.Co_seg_H = params['segmentoH'];    
    });

    this.metRep(detalleReportin);
  }

  ngAfterViewInit(){
   
  }

  createArrayOut(){
    let proveedor = new Array<Clientes>();
    this.detalleReport.RepCxCPorClienteResult.Clientes.forEach(element => {
      let cxc = new CxC(".",".",".","","Total Cliente :",null,
      this.getNetoAcumCxC(element.CxC),
      this.getSaldoAcumCXC(element.CxC)
      );  
      element.CxC.unshift(cxc);
      proveedor.push(element);
    });
    this.detalleReport.RepCxCPorClienteResult.Clientes = proveedor;
    

  }
  
  getNetoAcum(): number {
    let acumneto: number = 0;
    this.detalleReport.RepCxCPorClienteResult.Clientes.forEach(element => {
      element.CxC.forEach(el => {
        acumneto += +el.Monto_net;
      });
    });
    return acumneto;
  }
  getSaldoAcum(): number {
    let acumsaldo: number = 0;
   if ( this.detalleReport.RepCxCPorClienteResult.Clientes.length != 0){
      this.detalleReport.RepCxCPorClienteResult.Clientes.forEach(element => {
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
 
 

  suscribedRepDev: Subscription;

  metRep(repformin: RepAdmFormatosCxcClientesIn): void {
    this.global.showLoading();
    var msjerror : string = "";
    this.suscribedRepDev =  this.repAdm.repDev(repformin).subscribe( dev => {
      if(dev.RepCxCPorClienteResult.Error.toString()==""){
        msjerror = "No hay información para mostrar"
      }else{
        msjerror =dev.RepCxCPorClienteResult.Error.toString();
      }
      if( dev.RepCxCPorClienteResult.Error || dev.RepCxCPorClienteResult.Clientes.length ==0){
        swal( 
        dev.RepCxCPorClienteResult.Error? "ERROR":"INFO",
        msjerror,
        dev.RepCxCPorClienteResult.Error? "error":"info")
        .then((value) => {
          if (value || value==null) {
          }
        });
      }else{
            this.outPdf = cloneDeep(dev);
            setTimeout(() => {this.global.hideLoading(); 
              this.detalleReport = dev;
              this.createArrayOut();
            }, 3000);
        }
      },
      error => {
      }
    );
  }


  public createPdf() {
    this.global.showLoading();
    this.pdf.PdfCxC(this.outPdf);
    this.global.hideLoading();
  }

  updateValue(event, cell, rowIndex) {
 /*   this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];*/
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

  ngOnDestroy(): void {
    this.global.hideLoading();
    this.suscribedRepDev.unsubscribe();
  }
}
