import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { RepAdmFormatosService } from '../../../../../core/services/reportes/repAdmFormatos.service';
import { RepAdmFormatosIn } from '../../../../../abstract/DTO/in/reportes/repAdmFormatosIn';
import { RepAdmFormatosOut } from '../../../../../abstract/DTO/out/reportes/repAdmFormatos/repAdmFormatos';
import { ActivatedRoute } from '@angular/router';
import { MetodosGlobalesService } from '../../../../../core/services/metodosglobales.service';
import { Globals } from '../../../../../core/services/globals.service';
import { PdfFacturaDigitalService } from '../../../../../core/services/exportables/administrativo/ventas/facturas-digital/pdf-factura-digital.service';
import { PdfNotaEntregaService } from '../../../../../core/services/exportables/administrativo/ventas/nota-entrega/pdf-nota-entrega.service';
import { PdfNotaDespachoService } from '../../../../../core/services/exportables/administrativo/ventas/nota-despacho/pdf-nota-despacho.service';
import { PdfCotizacionDigitalService } from '../../../../../core/services/exportables/administrativo/ventas/cotizacion-digital/pdf-cotizacion-digital.service';
import { PdfDevolucionDigitalService } from '../../../../../core/services/exportables/administrativo/ventas/devolucion-digital/pdf-devolucion-digital.service';
import { PdfPedidoDigitalService } from '../../../../../core/services/exportables/administrativo/ventas/pedido-digital/pdf-pedido-digital.service';
import { PdfPlantillaVentaService } from '../../../../../core/services/exportables/administrativo/ventas/plantilla-venta/pdf-plantilla-venta.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reporte-detalles',
  templateUrl: './reporte-detalles.component.html',
  styleUrls: ['./reporte-detalles.component.css']
})
export class ReporteDetallesComponent implements OnInit, OnDestroy{

  @ViewChild('content') content: ElementRef;
  currentDate: any;
  titulo_detalle = "";
  titulo = "";
  type = "";
  
  // -------- REPORTE ----------
  detalleReport: RepAdmFormatosOut;
  repDev :Subscription;


  constructor(
    private  location: Location, 
    public pdfFD: PdfFacturaDigitalService,
    public pdfNE: PdfNotaEntregaService,
    public pdfND: PdfNotaDespachoService,
    public pdfCD: PdfCotizacionDigitalService,
    public pdfDD: PdfDevolucionDigitalService,
    public pdfPD: PdfPedidoDigitalService,
    public pdfPV: PdfPlantillaVentaService,
    private repAdm: RepAdmFormatosService, 
    public global: Globals,
    private route: ActivatedRoute,
    public serviceMoney: MetodosGlobalesService) {}

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    let detalleReportin: RepAdmFormatosIn;
    this.route.queryParams.subscribe(params => {
        let numeroDoc = parseInt(params['numero']);
        this.type = params['type'];
        let titulo_detalle = params['titulo_detalle'];
        let titulo = params['titulo'];
         detalleReportin = new RepAdmFormatosIn();
         detalleReportin.Numero = numeroDoc;
         detalleReportin.Documento = this.type;
         this.titulo = titulo;
         this.titulo_detalle = titulo_detalle;
    });
    this.metRep(detalleReportin);
    this.currentDate = new Date().toLocaleDateString('es-VE',{hour:'numeric', minute:'numeric',hour12:true}).split(' ');
  }

  metRep(repformin: RepAdmFormatosIn): void {
    $('section').css('visibility','hidden');
    this.global.showLoading();
    let msjerror
    this.repDev = this.repAdm.repDev(repformin).subscribe( dev => {
      if(dev.FormatosResult.Error.toString() ==""){
        msjerror = "No hay información que mostrar"
      }else{
        msjerror = dev.FormatosResult.Error.toString()
      }
      if(dev.FormatosResult.Error || dev.FormatosResult.Renglones==null &&  dev.FormatosResult.Encabezado == null){
              $('section').css('display','none');
              swal( 
              dev.FormatosResult.Error? "ERROR": "INFO",
              msjerror,
              dev.FormatosResult.Error? "error": "info")
            .then((value) => {
              if (value || value==null) {
                this.goBack();
                this.global.hideLoading();
              }
            });
            $(".swal-overlay").css('background-color', 'rgba(0,0,0,0.8)');

      }else{
        $('section').css('visibility','visible');
        this.detalleReport = dev;
        this.global.hideLoading();
      }
      },
      error => {});
  }

  public createPdf(dr: RepAdmFormatosOut) {
    this.global.showLoading();
    if(this.type == "FAC"){
      this.pdfFD.pdfFacDig(dr);
      this.global.hideLoading();
    } else if(this.type == "NOTA_E"){
      this.pdfNE.pdfNotaEn(dr);
      this.global.hideLoading();
    } else if(this.type == "NOTA_D"){
      this.pdfND.pdfNotaDe(dr);
      this.global.hideLoading();
    } else if (this.type == "COTIZ_C") {
      this.pdfCD.pdfCotizacion(dr);
      this.global.hideLoading();
    } else if (this.type == "DEV_CLI") {
      this.pdfDD.pdfDevolucion(dr);
      this.global.hideLoading();
    } else if (this.type == "PEDIDO") {
      this.pdfPD.pdfPedido(dr);
      this.global.hideLoading();
    } else if (this.type == "PLAVENT") {
      this.pdfPV.pdfPlantilla(dr);
      this.global.hideLoading();
    }
    
  }

  ngOnDestroy(){
    this.global.hideLoading();
    this.repDev.unsubscribe();
  }

}
