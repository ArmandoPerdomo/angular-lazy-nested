import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../../../../../core/services/globals.service';
import { RepAdmFormatoMovBancoService } from '../../../../../../../core/services/caja-blanco/repAdmFormatoMovBanco.service';
import { RepAdmFormatoMovBancoIn } from '../../../../../../../abstract/DTO/in/reporteAdmCajaBlanco/repAdmFormatoMovBancoIn';
import { RepAdmFormatoMovBancoOut } from '../../../../../../../abstract/DTO/out/reportesAdmCajaBlanco/repAdmMovBanco/repAdmMovBancoOut';
import { PdfMovimientoNumeroService } from '../../../../../../../core/services/exportables/administrativo/caja-banco/movimiento-por-numero/pdf-movimiento-numero.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movimiento-numero-tabla',
  templateUrl: './movimiento-numero-tabla.component.html',
  styleUrls: ['./movimiento-numero-tabla.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MovimientoNumeroTablaComponent implements OnInit, OnDestroy {
title: string;
Detalle: FormGroup;

  // -------- REPORTE ----------
  detalleReport: RepAdmFormatoMovBancoOut;
  repDev: Subscription;

  constructor(
    private  location: Location,
    public repAdm:  RepAdmFormatoMovBancoService,
    public router: Router,
    public global: Globals,
    private route: ActivatedRoute, 
    public pdf: PdfMovimientoNumeroService) {
    this.title = 'Movimiento de Banco por Número';

    

   }

  ngOnInit() {
    this.Detalle = new FormGroup ({
      enviar: new FormControl('')
    })

    let detalleReportin: RepAdmFormatoMovBancoIn;
    this.route.queryParams.subscribe(params => {
         let numD = parseInt(params["numeroD"]);
         let numH = parseInt(params["numeroH"]);

         detalleReportin = new RepAdmFormatoMovBancoIn();
         detalleReportin.Numero_d = numD
         detalleReportin.Numero_h=  numH;
         detalleReportin.Fecha = params["date"]; 
       
        });
    this.metRep(detalleReportin);
  }

  goBack(): void {
    this.location.back();
    this.global.hideLoading(); 
  }

  metRep(repformin: RepAdmFormatoMovBancoIn): void {
    this.global.showLoading();
    $('section').css('visibility','hidden');
    var msjerror : string = "";

    this.repDev = this.repAdm.repFormatoMovBanco(repformin).subscribe( dev => {
      if(dev.RepFormatoMovBancoResult.Error.toString()==""){
        msjerror = "No hay información para mostrar"
      }else{
        msjerror =dev.RepFormatoMovBancoResult.Error.toString();
      }


      if( dev.RepFormatoMovBancoResult.Error || dev.RepFormatoMovBancoResult.Documeto.length==0 || dev.RepFormatoMovBancoResult.Documeto==null){
        swal(   
          dev.RepFormatoMovBancoResult.Error? "ERROR":"INFO",
          msjerror,
          dev.RepFormatoMovBancoResult.Error? "error":"info")
        .then((value) => {
          if (value || value==null) {
            this.global.hideLoading();
          }
        });
       }else{
          $('section').css('visibility','visible');
          this.detalleReport = dev;
          this.global.hideLoading(); 
          
         }
        
        },
      error => {
      }
    );
  }

  createPDF(dout: RepAdmFormatoMovBancoOut){

    this.global.showLoading();
    this.pdf.pdfMBancoxNumero(dout);
    this.global.hideLoading();
  }

  ngOnDestroy(){
    this.global.hideLoading();
    this.repDev.unsubscribe();
  }
}

