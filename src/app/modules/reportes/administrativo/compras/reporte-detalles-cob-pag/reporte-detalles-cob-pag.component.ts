import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { RepAdmFormatosCobPagOut } from '../../../../../abstract/DTO/out/reportes/repAdmFormatosCobPag/repAdmFormatosCobPag';
import { RepAdmFormatosCobPagService } from '../../../../../core/services/reportes/repAdmFormatosCobPag.service';
import { ActivatedRoute } from '@angular/router';
import { MetodosGlobalesService } from '../../../../../core/services/metodosglobales.service';
import { DateConstPipe } from '../../../../../core/pipes/date-const.pipe';
import { RepAdmFormatosCobPagIn } from '../../../../../abstract/DTO/in/reportes/repAdmFormatosCobPagIn.';
import { Location } from '@angular/common';
import { Globals } from '../../../../../core/services/globals.service';
import { PdfPagoDigitalService } from '../../../../../core/services/exportables/administrativo/compras/pagos-digital/pdf-pago-digital.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reporte-detalles-cob-pag',
  templateUrl: './reporte-detalles-cob-pag.component.html',
  styleUrls: ['./reporte-detalles-cob-pag.component.css']
})
export class ReporteDetallesCobPagComponent implements OnInit, OnDestroy {

  @ViewChild('content') content: ElementRef;

  pdfObj = null;
  prueba = "hhh";
  titulo_detalle = "";
  titulo = "";
  acum = 0;
  // -------- REPORTE ----------
  detalleReport: RepAdmFormatosCobPagOut;
  repDev :Subscription;


  constructor(private location: Location, private repAdm: RepAdmFormatosCobPagService,
    private route: ActivatedRoute, private pdf: PdfPagoDigitalService, private serviceMoney: MetodosGlobalesService,public global: Globals,
    public datC: DateConstPipe) {
     
    }

  goBack() {
    this.location.back();
  }

  ngOnInit() {
    let detalleReportin: RepAdmFormatosCobPagIn;
    this.route.queryParams.subscribe(params => {
        let numeroDoc = parseInt(params['numero']);
        let type = params['type'];
        let titulo_detalle = params['titulo_detalle'];
        let titulo = params['titulo'];
         detalleReportin = new RepAdmFormatosCobPagIn();
         detalleReportin.Numero = numeroDoc;
         detalleReportin.Documento = type;
         this.titulo = titulo;
         this.titulo_detalle = titulo_detalle;
    });
    this.metRep(detalleReportin);
  }

  metRep(repformin: RepAdmFormatosCobPagIn): void {
    let msjerror : string;
    $('section').css('visibility','hidden');
    this.global.showLoading();

    this.repDev = this.repAdm.repDev(repformin).subscribe( dev => {
      if (dev.FormatosCobPagResult.Error.toString() == ""){
        msjerror = "No hay información que mostrar";
      }else{
        msjerror = dev.FormatosCobPagResult.Error.toString();
      }
      if( dev.FormatosCobPagResult.Error || dev.FormatosCobPagResult.DocumentosAsociados == null && dev.FormatosCobPagResult.Encabezado == null){
        swal(  
        dev.FormatosCobPagResult.Error? "ERROR":"INFO",
        msjerror,
        dev.FormatosCobPagResult.Error? "error":"info")
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
      dev.FormatosCobPagResult.DocumentosAsociados.forEach(x => {
        if(x.Tipo== 'FACT')
          this.acum= + this.acum + +x.MontoAbonado; 
      });
    }
      },
      error => {
      }
    );
  }
  public createPdf(dr: RepAdmFormatosCobPagOut) {
    this.global.showLoading();
    this.pdf.pdfComprasPago(dr);
    this.global.hideLoading();
  }

  ngOnDestroy(){
    this.global.hideLoading();
    this.repDev.unsubscribe();
  }


}
