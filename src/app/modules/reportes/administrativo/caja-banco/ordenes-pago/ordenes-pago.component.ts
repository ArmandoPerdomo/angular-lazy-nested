import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormControlService } from '../../../../../core/services/form-control.service';
import { Globals } from '../../../../../core/services/globals.service';
import { Router } from '@angular/router';
import { RepAdmFormatoPago2Out } from '../../../../../abstract/DTO/out/reportesAdmCajaBlanco/repAdmFormatoPago2/repAdmFormatoPago2Out';
import { RepAdmFormatoPago2In } from '../../../../../abstract/DTO/in/reporteAdmCajaBlanco/repAdmFormatoPago2In';
import { RepAdmFormatoPago2Service } from '../../../../../core/services/caja-blanco/repAdmFormatoPago2.service';
import { PdfOrdenPagoService } from '../../../../../core/services/exportables/administrativo/caja-banco/orden-pago/pdf-orden-pago.service';

@Component({
  selector: 'app-ordenes-pago',
  templateUrl: './ordenes-pago.component.html',
  styleUrls: ['./ordenes-pago.component.css']
})
export class OrdenesPagoComponent implements OnInit {
title: string;
OrdenDePago: FormGroup;
num: Number;
env ='';

  constructor(private  location: Location,
  public formService: FormControlService,
  public global: Globals,
  public repAdm: RepAdmFormatoPago2Service,
  public router: Router,
  public pdf: PdfOrdenPagoService) {
   
   }

   ngOnInit() {
    this.title = 'Pago digital';
    this.num = 1;
    this.env ='';

    this.OrdenDePago = new FormGroup ({
      numero: new FormControl('', [Validators.required]),
      enviar: new FormControl('', [Validators.required])
    });
   }
  goBack(): void {
    this.router.navigate([`app/reportes/dashboard`]);
  }
  limpiar(){
    this.num = 1;
    this.env ='';

  }
  Aceptar(){
    let msjerror;
    this.formService.markFormGroupTouched(this.OrdenDePago);
    if (this.OrdenDePago.valid)  {

     if (this.OrdenDePago.value["enviar"] == "Listado"){
      this.router.navigate([`${this.router.url}/detalle`], { queryParams: this.OrdenDePago.value });
      }else  if (this.OrdenDePago.value["enviar"] == "PDF"){
        let detalleReportOut: RepAdmFormatoPago2Out
        let detalleReportIn:RepAdmFormatoPago2In = new RepAdmFormatoPago2In();
        detalleReportIn.Numero_d = this.OrdenDePago.value['numero'];
        detalleReportIn.Numero_h = this.OrdenDePago.value['numero'];

        this.global.showLoading();
        
        this.repAdm.repOrdenesDePago(detalleReportIn).subscribe( dev => {
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
              detalleReportOut = dev;
              this.pdf.pdfOrdenDePago(detalleReportOut)
              this.global.hideLoading(); 
              
             }
            
            },
          (error) => {
          this.global.hideLoading(); 
          }
        );


      }
    }else{
      if (this.OrdenDePago.value["enviar"] == ""){
          swal("","Debe seleccionar una opción válida","info")
          .then((value) => {
            if (value || value==null) {
              
            }
          }); 
      }

    }
  }

}
