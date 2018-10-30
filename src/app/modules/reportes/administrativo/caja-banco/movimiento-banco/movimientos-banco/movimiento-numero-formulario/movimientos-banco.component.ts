import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormControlService } from '../../../../../../../core/services/form-control.service';
import { Router } from '@angular/router';
import { Globals } from '../../../../../../../core/services/globals.service';
import { RepAdmFormatoMovBancoService } from '../../../../../../../core/services/caja-blanco/repAdmFormatoMovBanco.service';
import { RepAdmFormatoMovBancoOut } from '../../../../../../../abstract/DTO/out/reportesAdmCajaBlanco/repAdmMovBanco/repAdmMovBancoOut';
import { RepAdmFormatoMovBancoIn } from '../../../../../../../abstract/DTO/in/reporteAdmCajaBlanco/repAdmFormatoMovBancoIn';
import { PdfMovimientoNumeroService } from '../../../../../../../core/services/exportables/administrativo/caja-banco/movimiento-por-numero/pdf-movimiento-numero.service';

const now = new Date();
@Component({
  selector: 'app-movimientos-banco',
  templateUrl: './movimientos-banco.component.html',
  styleUrls: ['./movimientos-banco.component.css']
})
export class MovimientosBancoComponent implements OnInit {
  //? Models
  env = '';
  numD : Number;
  numH : Number;
  //? Fecha
  fecha: NgbDateStruct;
  maxDate: NgbDateStruct;
  //? Para validacion de numero
  campoNumero : Boolean = true;

MBanco: FormGroup;
  constructor
    (private  location: Location,
    public formService: FormControlService,
    public repAdm:  RepAdmFormatoMovBancoService,
    public router: Router,
    public global: Globals,
    public pdf: PdfMovimientoNumeroService) {
      this.fecha = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
      this.maxDate = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
      this.env = '';
      this.numD = 0;
      this.numH = 999999999;
   }

  ngOnInit() {
    this.MBanco = new FormGroup ({
      numeroD: new FormControl('', [Validators.required]),
      numeroH: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      enviar: new FormControl('',  [Validators.required])
    });

    
  }
  goBack(): void {
    this.router.navigate([`app/reportes/dashboard`]);
  } 

  
  limpiar() {
    this.numD = 0;
    this.numH = 999999999;
    this.fecha = { day: now.getDate(), month: now.getMonth() + 1,year: now.getFullYear()};
    this.env = '';
  }

  Aceptar() {
    //* validando Formulario
    let fecha = this.MBanco.value.date.year.toString()+'-'+this.MBanco.value.date.month.toString()+'-'+this.MBanco.value.date.day.toString();
    this.formService.markFormGroupTouched(this.MBanco);
    if (this.MBanco.valid)  {

      if (this.MBanco.value["enviar"] == "Listado"  && this.validarNumero(this.MBanco.value["numD"], this.MBanco.value["numH"]) && this.validarFecha( this.MBanco.value["dateD"], this.MBanco.value["dateH"])){
        this.campoNumero = true;
        this.MBanco.controls["date"].setValue(fecha)

        this.router.navigate([`${this.router.url}/detalle`], { queryParams: this.MBanco.value });
        // this.router.navigate(['/Reportes/Administrativo/Compras/ReporteDetallesCobPag'], { queryParams: this.MBanco.value });
      }else if (this.MBanco.value["enviar"] == "PDF"  && this.validarNumero(this.MBanco.value["numD"], this.MBanco.value["numH"]) && this.validarFecha( this.MBanco.value["dateD"], this.MBanco.value["dateH"])){

        this.campoNumero = true;
        let detalleReportOut: RepAdmFormatoMovBancoOut;
        let detalleReportIn:RepAdmFormatoMovBancoIn = new RepAdmFormatoMovBancoIn();

        detalleReportIn.Numero_d = this.MBanco.value["numeroD"];
        detalleReportIn.Numero_h = this.MBanco.value["numeroH"];
        detalleReportIn.Fecha = fecha;

    
        let msjerror
        this.global.showLoading();
        this.repAdm.repFormatoMovBanco(detalleReportIn).subscribe(dev =>{
          if(dev.RepFormatoMovBancoResult.Error.toString()==""){
            msjerror = "No hay información que imprimir"
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
            detalleReportOut = dev;
            this.global.hideLoading();
            this.pdf.pdfMBancoxNumero(detalleReportOut);
          }
        },
        error => {
        })

      }
    }else{
      swal("","Debe seleccionar una opción válida","info")
      .then((value) => {
        if (value || value==null) {
          
        }
      }); 
    }

  }

  

  //? Validaciones fecha y numero
  validarFecha(dateD, dateH): boolean{
    if (dateD > dateH)
      return false;
    else
      return true;

   }
   validarNumero(numD, numH): boolean{
    if (numD > numH)
    {
      this.campoNumero = false
      return false;
    }else{
       return true;
    }
   }

}
