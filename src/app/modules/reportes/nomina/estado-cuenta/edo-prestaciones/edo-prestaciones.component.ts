import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { ListaTrabajadoresService } from '../../../../../core/services/listas/lista-trabajadores.service';
import { ListaTrabajadoresIn } from '../../../../../abstract/DTO/in/listaTrabajadoresIn';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { FormControlService } from '../../../../../core/services/form-control.service';
import { Router } from '@angular/router';
import { RepNomEstCuentaPrestacionesOut } from '../../../../../abstract/DTO/out/reportesNomina/repNomEstCuentaPrestaciones/repNomEstCuentaPrestacionesOut';
import { RepNomEstCuentaPrestacionesIn } from '../../../../../abstract/DTO/in/reportesNomina/repNomEstCuentaPrestacionesIn';
import { RepEdoCuentaPrestacionesService } from '../../../../../core/services/estados_de_cuenta/repEdoCuentaPrestaciones.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Globals } from '../../../../../core/services/globals.service';
import { PdfEcPrestacionesService } from '../../../../../core/services/exportables/nomina/estado-cuenta/prestaciones/pdf-ec-prestaciones.service';

const now = new Date();

@Component({
  selector: 'app-edo-prestaciones',
  templateUrl: './edo-prestaciones.component.html',
  styleUrls: ['./edo-prestaciones.component.css']
})
export class EdoPrestacionesComponent implements OnInit {
   tilEdoPrestaciones: string;


   //? Fecha
   FechaD: NgbDateStruct;
   FechaH: NgbDateStruct;
   maxDate: NgbDateStruct;
   env = '';
   ListadoEdoPrestaciones: FormGroup;
   minDate: Date;
 

   //? Variales para combo
   trabajadorCallback: Observable<any>;

   //! NgModel
   TrabajadorD: String;
   TrabajadorH: String;

  constructor(
    public listaT: ListaTrabajadoresService,
    public pdf: PdfEcPrestacionesService,  
    public formService: FormControlService,
    public router: Router,
    public repNomPrestaciones: RepEdoCuentaPrestacionesService,  
    public global: Globals) {

        this.tilEdoPrestaciones = 'Estado de cuenta prestaciones';
        
   }


  ngOnInit() {
    this.env = '';
    this.FechaH = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
    this.maxDate = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
    this.FechaD = {year: now.getFullYear(), month: 1 , day: 1};

    this.ListadoEdoPrestaciones = new FormGroup ({

      dateD: new FormControl('', [Validators.required]),
      dateH: new FormControl('', [Validators.required]),
      trabajadorD: new FormControl('',[Validators.required]),
      trabajadorH: new FormControl(''),
      enviar: new FormControl('', [Validators.required]),

    });

     let ltrab: ListaTrabajadoresIn = new ListaTrabajadoresIn();
     this.trabajadorCallback = this.listaT.listaTrabajadores(ltrab);
  }

  Aceptar() {
    //* validando Formulario
    let fechaDesde = this.ListadoEdoPrestaciones.value.dateD.year.toString()+'-'+this.ListadoEdoPrestaciones.value.dateD.month.toString()+'-'+this.ListadoEdoPrestaciones.value.dateD.day.toString();
    let fechaHasta = this.ListadoEdoPrestaciones.value.dateH.year.toString()+'-'+this.ListadoEdoPrestaciones.value.dateH.month.toString()+'-'+this.ListadoEdoPrestaciones.value.dateH.day.toString();

    this.formService.markFormGroupTouched(this.ListadoEdoPrestaciones);
    if (this.ListadoEdoPrestaciones.valid){
        if (this.ListadoEdoPrestaciones.value["enviar"] == "Listado" && this.validarFecha(this.ListadoEdoPrestaciones.value["dateD"] , this.ListadoEdoPrestaciones.value["dateH"])){
        
          this.ListadoEdoPrestaciones.controls["dateD"].setValue(fechaDesde);
          this.ListadoEdoPrestaciones.controls["dateH"].setValue(fechaHasta);
          this.router.navigate([`${this.router.url}/detalle`], { queryParams: this.ListadoEdoPrestaciones.value });
          
        }else if(this.ListadoEdoPrestaciones.value["enviar"] == "PDF" && this.validarFecha(this.ListadoEdoPrestaciones.value["dateD"] , this.ListadoEdoPrestaciones.value["dateH"])){
                
              let detalleReportOut: RepNomEstCuentaPrestacionesOut;
              let detalleReportin:RepNomEstCuentaPrestacionesIn = new RepNomEstCuentaPrestacionesIn();
              let msjerror: String;

              detalleReportin.Tabajador_D = this.ListadoEdoPrestaciones.value["trabajadorD"];
              detalleReportin.Tabajador_H = this.ListadoEdoPrestaciones.value["trabajadorH"];
              detalleReportin.Fecha_D = fechaDesde;
              detalleReportin.Fecha_h = fechaHasta;
              
              this.global.showLoading();
              
              this.repNomPrestaciones.repNomPrestaciones(detalleReportin).subscribe(dev =>{
                if (dev.RepEstadoCuentasPrestacionesResult.Error.toString() == "") {
                  msjerror = "No hay información para mostrar"
                } else {
                  msjerror = dev.RepEstadoCuentasPrestacionesResult.Error.toString();
                }
                
                  if (dev.RepEstadoCuentasPrestacionesResult.Prestaciones.length == 0 || dev.RepEstadoCuentasPrestacionesResult.Error) {

                    swal(          
                    dev.RepEstadoCuentasPrestacionesResult.Error ? "ERROR": "INFO", 
                    msjerror.toString(),
                    dev.RepEstadoCuentasPrestacionesResult.Error ?  "error": "info"
                    )
                      .then((value) => {
                        if (value || value == null) {
                          this.global.hideLoading();
                        }
                      });


                  } else{
                    detalleReportOut = dev;
                      this.global.hideLoading();
                      this.pdf.pdfEdoCuentaPrestaciones(detalleReportOut, detalleReportin);
                  
                  }
               
              },
              error => {
              
              })
        }

    }else{
      if(this.ListadoEdoPrestaciones.value["enviar"]==""){
        swal("","Debe seleccionar una opción","info")
        .then((value) => {
          if (value || value==null) {
           
          }
        });
      } 
    }

  }

  //? Cambio en el combo
  changeTrabajadorCodigo(codigo: String) {
   this.TrabajadorH = codigo;
  }

  cleanTrabajador(codigo: String) {
    this.TrabajadorD = codigo;
    this.TrabajadorH = codigo;
   }

  goBack(): void {
    this.router.navigate([`app/reportes/dashboard`]);
  }

  limpiar() {
    this.cleanTrabajador(null);
    this.FechaH = { day: now.getDate(), month: now.getMonth() + 1,year: now.getFullYear()};
    this.FechaD = { day: 1, month: 1 ,year: now.getFullYear()};
    this.env = 'Listado';
  }
  
  validarFecha(dateD, dateH): boolean{
    if (dateD > dateH)
      return false;
    else
      return true;
  }

}


