import { Component, OnInit, OnDestroy } from '@angular/core';
import { RepAdmFormatosCobPagOut } from '../../../../../abstract/DTO/out/reportes/repAdmFormatosCobPag/repAdmFormatosCobPag';
import { RepAdmFormatosCobPagService } from '../../../../../core/services/reportes/repAdmFormatosCobPag.service';
import { ActivatedRoute } from '@angular/router';
import { RepAdmFormatosCobPagIn } from '../../../../../abstract/DTO/in/reportes/repAdmFormatosCobPagIn.';
import { Location } from '@angular/common';
import { Globals } from '../../../../../core/services/globals.service';
import { PdfCobroDigitalService } from '../../../../../core/services/exportables/administrativo/ventas/cobro-digital/pdf-cobro-digital.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reporte-cobro-detalle',
  templateUrl: './reporte-cobro-detalle.component.html',
  styleUrls: ['./reporte-cobro-detalle.component.css']
})
export class ReporteCobroDetalleComponent implements OnInit, OnDestroy {

  acum: Number;
  pdfObj = null;
  prueba = "hhh";
  titulo_detalle = "";
  titulo = "";
  // -------- REPORTE ----------
  detalleReport: RepAdmFormatosCobPagOut;
  repDev :Subscription;

  constructor(
    private  location: Location, 
    private repAdm: RepAdmFormatosCobPagService,
    private route: ActivatedRoute, 
    public pdf: PdfCobroDigitalService,
    public global: Globals) {
   
   }
  goBack(): void {
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
         this.acum = 0.00;
    });
    this.metRep(detalleReportin);
  }



  metRep(repformin: RepAdmFormatosCobPagIn): void {
    $('section').css('visibility','hidden');
    this.global.showLoading();
    let msjerror : string;
    this.repDev = this.repAdm.repDev(repformin).subscribe( dev => {
      if(dev.FormatosCobPagResult.Error.toString() ==""){
        msjerror = "No hay información que mostrar"
      }else{
        msjerror = dev.FormatosCobPagResult.Error.toString()
      }
      if(dev.FormatosCobPagResult.Error || dev.FormatosCobPagResult.DocumentosAsociados==null &&  dev.FormatosCobPagResult.Encabezado == null){
            $('section').css('display','none');
            swal( 
            dev.FormatosCobPagResult.Error? "ERROR": "INFO",
            msjerror,
            dev.FormatosCobPagResult.Error? "error": "info")
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
          if(x.Tipo == 'FACT')
            this.acum= +this.acum + +x.MontoAbonado; 
        });
      }

      },
      error => {
      }
    );
  }
  public createPdf(dr: RepAdmFormatosCobPagOut) {
    this.global.showLoading();
    this.pdf.pdfCobro(dr);
    this.global.hideLoading();
  }

  ngOnDestroy(){
    this.global.hideLoading();
    this.repDev.unsubscribe();
  }
}
