import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { RepAdmMovBancoxNumeroService } from '../../../../../../../core/services/caja-blanco/repAdmMovBancoxNumero.service';
import { FormGroup, FormControl } from '@angular/forms';
import { RepAdmMovBancoxNumeroIn } from '../../../../../../../abstract/DTO/in/reporteAdmCajaBlanco/repAdmMovBancoxNumeroIn';
import { Globals } from '../../../../../../../core/services/globals.service';
import { RepAdmMovBancoxNumeroOut } from '../../../../../../../abstract/DTO/out/reportesAdmCajaBlanco/repAdmMovBancoxNumero/repAdmMovBancoxNumeroOut';
import { ActivatedRoute } from '@angular/router';
import { PdfMovimientoFormatoService } from '../../../../../../../core/services/exportables/administrativo/caja-banco/movimiento-formato/pdf-movimiento-formato.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movimiento-formato-tabla',
  templateUrl: './movimiento-formato-tabla.component.html',
  styleUrls: ['./movimiento-formato-tabla.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MovimientoFormatoTablaComponent implements OnInit, OnDestroy {
  title: string;
  Detalle: FormGroup;
  repDev: Subscription;
  detalleReport: RepAdmMovBancoxNumeroOut;
  enableSummary = true;
  summaryPosition = 'bottom';
  detalleReportIn: RepAdmMovBancoxNumeroIn;
  env = '';
  constructor(
    private  location: Location,
    public pdf: PdfMovimientoFormatoService,
    public global: Globals,
    private route: ActivatedRoute,
    public repAdm: RepAdmMovBancoxNumeroService) {
      
  }

  ngOnInit() {
      this.title = 'Movimiento de banco formato digital';
      this.env="PDF";
    this.Detalle = new FormGroup ({
      enviar: new FormControl('')
    })
    
    this.route.queryParams.subscribe(params => {
            
         this.detalleReportIn = new RepAdmMovBancoxNumeroIn();
         
         this.detalleReportIn.Numero_d = params['numero'];
         this.detalleReportIn.Numero_h = params['numero'];
 
         this.detalleReportIn.CodigoCuenta_d = params['cuentaD'];
         this.detalleReportIn.CodigoCuenta_h = params['cuentaH'];
 
         this.detalleReportIn.CuentaIngreso_d = params['cuentaIng'];
         this.detalleReportIn.CuentaIngreso_h = params['cuentaIng'];
     
         this.detalleReportIn.TipoMovim = params['tipoMov'];
         this.detalleReportIn.Conciliado = params['conciliado'];
         this.detalleReportIn.OrigenMovim = params['origenMov'];
         this.detalleReportIn.Moneda = params['moneda'];
         this.detalleReportIn.CuentaInactiva = params['cuentaIna'];
         this.detalleReportIn.Condicion = params['condicion'];
        });

    
       
    this.metRep(this.detalleReportIn);
    this.env="PDF";
  }

  goBack(): void {
    this.location.back();
  }

  metRep(repformin: RepAdmMovBancoxNumeroIn): void {
    this.global.showLoading();
    $('section').css('visibility','hidden');
    var msjerror : string = "";

    this.repDev = this.repAdm.repBancoxNumero(repformin).subscribe( dev => {
      if(dev.RepMovBancoxNumeroResult.Error.toString()==""){
        msjerror = "No hay información para mostrar"
      }else{
        msjerror =dev.RepMovBancoxNumeroResult.Error.toString();
      }
      if(dev.RepMovBancoxNumeroResult.Error || dev.RepMovBancoxNumeroResult.Documeto.length==0 || dev.RepMovBancoxNumeroResult.Documeto==null){
          $('section').css('display','none');
          swal(  
            dev.RepMovBancoxNumeroResult.Error? "ERROR":"INFO",
            msjerror,
            dev.RepMovBancoxNumeroResult.Error? "error":"info")
          .then((value) => {
            if (value || value==null) {
              this.goBack();
              this.global.hideLoading(); 
             
            }});
          $(".swal-overlay").css('background-color', 'rgba(0,0,0,0.8)');
        }
        else
        {
          $('section').css('visibility','visible');
          this.detalleReport = dev;
          this.global.hideLoading(); 
          
         }
        
        },
      error => {
      }
    );
  }

  createPDF(rout:RepAdmMovBancoxNumeroOut ){
    this.global.showLoading();
    if( rout.RepMovBancoxNumeroResult.Documeto.length>14999 ){
      swal("","El número de datos excede el límite, establecer otro rango","error")
      .then((value) => {
        if (value || value==null) {
          this.global.hideLoading();
        }
      });

    }else if (this.Detalle.value["enviar"] == "PDF"){
      this.pdf.pdfMovimientoFormatoDigital(rout);
      this.global.hideLoading();
    }
  }
  ngOnDestroy(){
    this.global.hideLoading();
    this.repDev.unsubscribe();
  }


}
