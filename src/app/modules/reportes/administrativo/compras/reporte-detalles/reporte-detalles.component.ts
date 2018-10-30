import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { RepAdmFormatosService } from '../../../../../core/services/reportes/repAdmFormatos.service';
import { RepAdmFormatosIn } from '../../../../../abstract/DTO/in/reportes/repAdmFormatosIn';
import { RepAdmFormatosOut } from '../../../../../abstract/DTO/out/reportes/repAdmFormatos/repAdmFormatos';
import { ActivatedRoute } from '@angular/router';
import { MetodosGlobalesService } from '../../../../../core/services/metodosglobales.service';
import { DateConstPipe } from '../../../../../core/pipes/date-const.pipe';
import { Globals } from '../../../../../core/services/globals.service';
import { PdfOrdenCompraService } from '../../../../../core/services/exportables/administrativo/compras/orden-compra/pdf-orden-compra.service';
import { PdfDevolucionProveedorService } from '../../../../../core/services/exportables/administrativo/compras/devolucion-proveedor/pdf-devolucion-proveedor.service';
import { PdfCotizacionProveedorService } from '../../../../../core/services/exportables/administrativo/compras/cotizacion-proveedor/pdf-cotizacion-proveedor.service';
import { PdfNotasRecepcionService } from '../../../../../core/services/exportables/administrativo/compras/notas-recepecion/pdf-notas-recepcion.service';
import { PdfFacturaCompraService } from '../../../../../core/services/exportables/administrativo/compras/factura-compra/pdf-factura-compra.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reporte-detalles',
  templateUrl: './reporte-detalles.component.html',
  styleUrls: ['./reporte-detalles.component.css']
})
export class ReporteDetallesComponent implements OnInit, OnDestroy {
  @ViewChild('content') content: ElementRef;
  currentDate: any;
  pdfObj = null;
  prueba = "hhh";
  titulo_detalle = "";
  titulo = "";
  type
  // -------- REPORTE ----------
  detalleReport: RepAdmFormatosOut;
  repDev :Subscription;

  constructor(
    private location: Location, 
    private repAdm: RepAdmFormatosService,
    private route: ActivatedRoute, 
    public serviceMoney: MetodosGlobalesService,
    public datC: DateConstPipe,
    public pdfOC: PdfOrdenCompraService,
    public pdfDP: PdfDevolucionProveedorService,
    public pdfCP: PdfCotizacionProveedorService,
    public pdfNR: PdfNotasRecepcionService,
    public pdfFC: PdfFacturaCompraService,
    public global: Globals) {
      
    }

  goBack() {
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
  }
  metRep(repformin: RepAdmFormatosIn): void {
    let msjerror : string;
    $('section').css('visibility','hidden');
    this.global.showLoading();

    this.repDev = this.repAdm.repDev(repformin).subscribe( dev => {
      if (dev.FormatosResult.Error.toString() == ""){
        msjerror = "No hay información que mostrar";
      }else{
        msjerror = dev.FormatosResult.Error.toString();
      }
      if(dev.FormatosResult.Error || dev.FormatosResult.Renglones == null &&  dev.FormatosResult.Encabezado == null){ 
            swal(
              dev.FormatosResult.Error? "ERROR":"INFO",
              msjerror,
              dev.FormatosResult.Error? "error":"info")
            .then((value) => {
              if (value || value==null) {
                this.goBack();
                this.global.hideLoading();

              }
            });
            $(".swal-overlay").css('background-color', 'rgba(0,0,0,0.8)');

      }else{
        $('section').css('visibility','visible');
        this.global.hideLoading();
        this.detalleReport = dev;
       
      }
      },
      error => {
      }
    );
  }
  public createPdf(dr: RepAdmFormatosOut) {
    this.global.showLoading();
   if(this.type == 'ORDENC'){
    this.pdfOC.pdfOrdenC(dr);
    this.global.hideLoading();
   }else if(this.type == 'NOTA_R'){
    this.pdfNR.pdfNotasRecepcion(dr);
    this.global.hideLoading();
   }else if(this.type == 'COMPRAS') {
     this.pdfFC.pdfFacturaCompra(dr);
     this.global.hideLoading();
   }else if(this.type == 'DEV_PROV' ){
    this.pdfDP.pdfDevolucionCompra(dr);
    this.global.hideLoading();
   }else if(this.type == 'COTIZ_P' ){
    this.pdfCP.pdfCotizacionCompra(dr);
    this.global.hideLoading();
   }

  }
  ngOnDestroy(){
    this.global.hideLoading();
    this.repDev.unsubscribe();
  }


}
