import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RepAdmFormatoPago2Service } from '../../../../../../core/services/caja-blanco/repAdmFormatoPago2.service';
import { RepAdmFormatoPago2In } from '../../../../../../abstract/DTO/in/reporteAdmCajaBlanco/repAdmFormatoPago2In';
import { RepAdmFormatoPago2Out } from '../../../../../../abstract/DTO/out/reportesAdmCajaBlanco/repAdmFormatoPago2/repAdmFormatoPago2Out';
import { FormGroup, FormControl } from '@angular/forms';
import { Globals } from '../../../../../../core/services/globals.service';
import { PdfOrdenPagoService } from '../../../../../../core/services/exportables/administrativo/caja-banco/orden-pago/pdf-orden-pago.service';
import { FormControlService } from '../../../../../../core/services/form-control.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-orden-pago-formato',
  templateUrl: './orden-pago-formato.component.html',
  styleUrls: ['./orden-pago-formato.component.css']
})
export class OrdenPagoFormatoComponent implements OnInit, OnDestroy {

  env = 'PDF';
  detalleReport: RepAdmFormatoPago2Out = new RepAdmFormatoPago2Out();
  Detalle: FormGroup;
  repDev: Subscription;
  constructor(private  location: Location,
    private route: ActivatedRoute,
    public repAdm: RepAdmFormatoPago2Service,
    public global: Globals,
    public pdf: PdfOrdenPagoService,
    public formService: FormControlService) {
    }

    ngOnInit() {
      this. env = 'PDF';
      this.Detalle = new FormGroup ({
        enviar: new FormControl('PDF')
       })
  
     
      let detalleReportIn = new RepAdmFormatoPago2In();
           this.route.queryParams.subscribe(params => {
           detalleReportIn.Numero_d = params['numero'];
           detalleReportIn.Numero_h = params['numero'];
          });
      this.metRep(detalleReportIn);
    }
     goBack(): void {
      this.location.back();
     }

     metRep(repformin: RepAdmFormatoPago2In): void {
      this.global.showLoading();
      $('section').css('visibility','hidden');
      var msjerror : string = "";
  
      this.repDev = this.repAdm.repOrdenesDePago(repformin).subscribe( dev => {
        if(dev.RepFormatoPago2Result.Error.toString()==""){
          msjerror = "No hay información para mostrar"
        }else{
          msjerror =dev.RepFormatoPago2Result.Error.toString();
        }

        if(dev.RepFormatoPago2Result.Error || dev.RepFormatoPago2Result.Documeto.length==0){
            swal( 
            dev.RepFormatoPago2Result.Error? "ERROR":"INFO",
            msjerror,
            dev.RepFormatoPago2Result.Error? "error":"info")
            .then((value) => {
              if (value || value==null) {
                this.global.hideLoading(); 
              }});
          }
          else
          {
            $('section').css('visibility','visible');
            this.detalleReport = dev;
            this.global.hideLoading(); 
            
           }
          
          },
        (error) => {
        this.global.hideLoading(); 
        }
      );
    
    }
    Aceptar(){
      this.formService.markFormGroupTouched(this.Detalle);
     
        if (this.Detalle.value["enviar"] == "PDF"){
        
          this.global.showLoading();
          this.pdf.pdfOrdenDePago(this.detalleReport);
          this.global.hideLoading();
        
            }
          else{
          swal("","Debe seleccionar una opción válida","info")
          .then((value) => {
          if (value || value==null) {
            
          }
        }); 
      }
    }

    ngOnDestroy(){
      this.global.hideLoading();
      this.repDev.unsubscribe();
    }
}
