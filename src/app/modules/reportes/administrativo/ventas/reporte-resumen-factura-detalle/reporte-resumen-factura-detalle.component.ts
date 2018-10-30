import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RepAdmFacturaResumenCompletoService } from '../../../../../core/services/ventas/repAdmFacturaResumenCompleto.service';
import { RepAdmFacturaResumenCompletoIn } from '../../../../../abstract/DTO/in/reportesAdmVentas/repAdmFacturaResumenCompleto';
import { RepAdmFacturaResumenCompletoOut } from '../../../../../abstract/DTO/out/reportesAdmVentas/repAdmFacturaResumenCompleto/repAdmFacturaResumenCompleto';
import { Globals } from '../../../../../core/services/globals.service';
import { PdfResumenFacturaService } from '../../../../../core/services/exportables/administrativo/ventas/resumen-factura/pdf-resumen-factura.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reporte-resumen-factura-detalle',
  templateUrl: './reporte-resumen-factura-detalle.component.html',
  styleUrls: ['./reporte-resumen-factura-detalle.component.css']
})
export class ReporteResumenFacturaDetalleComponent implements OnInit, OnDestroy {

  @ViewChild('content') content: ElementRef;

  titulo_detalle = "";
  titulo = "";

  documentoDespacho: Boolean = false;
  mostrarText: Boolean = false;


  // -------- REPORTE ----------
  detalleReport: RepAdmFacturaResumenCompletoOut;
  repDev :Subscription;

  constructor(
  private  location: Location, 
  public repAdm: RepAdmFacturaResumenCompletoService,
  public global: Globals,
  private route: ActivatedRoute, 
  public pdf: PdfResumenFacturaService) { }


  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    let detalleReportin: RepAdmFacturaResumenCompletoIn;
    this.route.queryParams.subscribe(params => {
        let numeroDoc = parseInt(params['numero']);
        let titulo_detalle = params['titulo_detalle'];
        let titulo = params['titulo'];
         detalleReportin = new RepAdmFacturaResumenCompletoIn();
         detalleReportin.Numero_d = numeroDoc;
         detalleReportin.Numero_h = numeroDoc;
         this.titulo = titulo;
         this.titulo_detalle = titulo_detalle;
    });
    this.metRep(detalleReportin);
  }

  metRep(repformin: RepAdmFacturaResumenCompletoIn): void {
    $('section').css('visibility','hidden');
    this.global.showLoading();
    let msjerror: string ="";
    this.repDev = this.repAdm.listFacturaAdmin(repformin).subscribe( dev => {
    if(dev.ReporteFacturaResumenCompletoResult.Error.toString()==""){
      msjerror = "No hay información para mostrar";
    }else{
      msjerror = dev.ReporteFacturaResumenCompletoResult.Error.toString();
    }

      if(dev.ReporteFacturaResumenCompletoResult.Error||  dev.ReporteFacturaResumenCompletoResult.ResumenFacturas.length==0){
        swal( 
          dev.ReporteFacturaResumenCompletoResult.Error? "ERROR": "INFO",
          msjerror,
          dev.ReporteFacturaResumenCompletoResult.Error? "error": "info")
        .then((value) => {
          if (value || value==null) {
            this.goBack();
            this.global.hideLoading();
          }
        });
        $(".swal-overlay").css('background-color', 'rgba(0,0,0,0.8)');
      }else{
          this.global.hideLoading();
          $('section').css('visibility','visible');
          if(dev.ReporteFacturaResumenCompletoResult.ResumenFacturas[0].Documentos.length==2){
            this.documentoDespacho = true
          }
          if(dev.ReporteFacturaResumenCompletoResult.ResumenFacturas[0].Documentos.length==1){
            this.mostrarText = true
          }
         
          this.detalleReport = dev;
          //* Este metodo suma los montos de la tabla Resumen Cantidad
          this.cargarNums(); 
        }
      },
      error => { });
  }

  public createPdf(dr: RepAdmFacturaResumenCompletoOut) {
    this.global.showLoading();
    this.pdf.pdfResumenFactura(dr);
    this.global.hideLoading();
  }


  numerito=0;
  numerito2=0;
  numerito3=0;
  numerito4=0;

  cargarNums(){
    this.suma(1);this.suma(2);this.suma(3);this.suma(4);
  }

  suma(num){
    switch (num) {
      case 1:
        this.detalleReport.ReporteFacturaResumenCompletoResult.ResumenFacturas[0].ResumenCantida.forEach(item => {
          this.numerito+=Number(item.Facturado);
        });
        break;
      case 2:
        this.detalleReport.ReporteFacturaResumenCompletoResult.ResumenFacturas[0].ResumenCantida.forEach(item => {
          this.numerito2+=Number(item.Devuelto);
        });
        break;
      case 3:
        this.detalleReport.ReporteFacturaResumenCompletoResult.ResumenFacturas[0].ResumenCantida.forEach(item => {
          this.numerito3+=Number(item.Despachado);
        });
        break;
      default:
        this.detalleReport.ReporteFacturaResumenCompletoResult.ResumenFacturas[0].ResumenCantida.forEach(item => {
          this.numerito4+=Number(item.Pordespachar);
        });
        break;
    }
  }
  ngOnDestroy(){
    this.global.hideLoading();
    this.repDev.unsubscribe();
  }


}
