import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ListaTrabajadoresIn } from '../../../../../abstract/DTO/in/listaTrabajadoresIn';
import { ListaTrabajadoresService } from '../../../../../core/services/listas/lista-trabajadores.service';
import { FormControlService } from '../../../../../core/services/form-control.service';
import { Router } from '@angular/router';
import { RepEdoCuentaPrestamosService } from '../../../../../core/services/estados_de_cuenta/repEdoCuentaPrestamos.service';
import { RepNomEstCuentaPrestamosIn } from '../../../../../abstract/DTO/in/reportesNomina/repNomEstCuentaPrestamosIn';
import { Globals } from '../../../../../core/services/globals.service';
import { RepNomEstCuentaPrestamosOut } from '../../../../../abstract/DTO/out/reportesNomina/repNomEstCuentaPrestamos/repNomEstCuentaPrestamosOut';
import { PdfEcPrestamoService } from '../../../../../core/services/exportables/nomina/estado-cuenta/prestamo/pdf-ec-prestamo.service';
import { ListaEdoCuentaPrestamoService } from '../../../../../core/services/listas/section-mock/lista-edo-cuentas-prestamos.service';
import { ListaTipoPrestamoIn } from '../../../../../abstract/DTO/in/listaTipoPrestamoIn';
import { ListaTipoPrestamoService } from '../../../../../core/services/listas/lista-tipo-prestamo.service';
import { ListaContratoIn } from '../../../../../abstract/DTO/in/listaContratoIn';
import { ListaContratoService } from '../../../../../core/services/listas/lista-contrato.service';

const now = new Date();

@Component({
  selector: 'app-edo-prestamo',
  templateUrl: './edo-prestamo.component.html',
  styleUrls: ['./edo-prestamo.component.css']
})
export class EdoPrestamoComponent implements OnInit {
  tilEdoPrestamo: string;

  //? Models
  tip: String;
  frec: String;
  pai: String;
  met: String;
  empF: String;
  empU: String;
  conF: String;
  conU: String;
  send = '';
  prestamo: FormGroup;
  //? Fecha
  datF: NgbDateStruct;
  datU: NgbDateStruct;
  maxDate: NgbDateStruct;
  
  //? Variales para combo
  employeeCallback: Observable<any>;
  contractCallback: Observable<any>;
  typeCallback: Observable<any>;
  frequencyCallback: Observable<any>;
  paidCallback: Observable<any>;
  methodCallback: Observable<any>;

  constructor(
    public global: Globals,
    public lemp: ListaTrabajadoresService,
    public router: Router,
    public repNom: RepEdoCuentaPrestamosService,
    public pdf: PdfEcPrestamoService,
    public ltp: ListaTipoPrestamoService,
    public lcon: ListaContratoService,
    public listEC: ListaEdoCuentaPrestamoService,
    public formService: FormControlService) {
      this.tilEdoPrestamo = 'Control de préstamos'
   }

  ngOnInit() {
    this.send = '';
    this.datU = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
    this.maxDate = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
    this.datF = {year: now.getFullYear(), month: 1 , day: 1};

    let lemp: ListaTrabajadoresIn = new ListaTrabajadoresIn();
    this.employeeCallback = this.lemp.listaTrabajadores(lemp);

    let ltp: ListaTipoPrestamoIn = new ListaTipoPrestamoIn();
    this.typeCallback = this.ltp.listaTipoPrestamo(ltp);

    let lcon: ListaContratoIn = new ListaContratoIn();
    this.contractCallback = this.lcon.listaContrato(lcon);
   
    this.frequencyCallback = this.listEC.listaFrecuencia();
    this.methodCallback = this.listEC.listaMetodos();
    this.paidCallback = this.listEC.listaPagados();


    this.prestamo = new FormGroup ({
      type: new FormControl(''),
      employeeF: new FormControl(''),
      employeeU: new FormControl(''),
      contractF: new FormControl(''),
      contractU: new FormControl(''),
      dateF: new FormControl('', [Validators.required]),
      dateU: new FormControl('', [Validators.required]),
      frequency: new FormControl(''),
      paid: new FormControl(''),
      method: new FormControl(''),
      sendTo: new FormControl('', [Validators.required])   
    });
  }

  goBack(): void {
    this.router.navigate([`app/reportes/dashboard`]);
  }

  cleanType(code: String){
    this.tip = code
  }
  cleanEmployee(code: String){
    this.empF = code
    this.empU = code
  }
  cleanContract(code: String){
    this.conF = code
    this.conU = code
  }
  cleanFrequency(code: String){
    this.frec = code
  }
  cleanMethod(code: String){
    this.met = code
  }
  cleanPaid(code: String){
    this.pai = code
  }
 
  limpiar(){
    this.cleanType(null);
    this.cleanEmployee(null);
    this.cleanContract(null);
    this.cleanFrequency(null);
    this.cleanMethod(null);    
    this.cleanPaid(null);
    this.datU = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
    this.maxDate = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
    this.datF = {year: now.getFullYear(), month: 1 , day: 1};
  }

  Aceptar(){
     //* validando Formulario
     let dateF = this.prestamo.value.dateF.year.toString()+'-'+this.prestamo.value.dateF.month.toString()+'-'+this.prestamo.value.dateF.day.toString();
     let dateU = this.prestamo.value.dateU.year.toString()+'-'+this.prestamo.value.dateU.month.toString()+'-'+this.prestamo.value.dateU.day.toString();
    
     this.formService.markFormGroupTouched(this.prestamo);
     if (this.prestamo.valid){
        if (this.prestamo.value["sendTo"] == "Listado" && this.validarFecha(this.prestamo.value["dateF"] , this.prestamo.value["dateU"])){
        
          this.prestamo.controls["dateF"].setValue(dateF);
          this.prestamo.controls["dateU"].setValue(dateU);
          this.router.navigate([`${this.router.url}/detalle`], { queryParams: this.prestamo.value });
          
        }else if(this.prestamo.value["sendTo"] == "PDF" && this.validarFecha(this.prestamo.value["dateF"] , this.prestamo.value["dateU"])){
                
          let detalleReportOut: RepNomEstCuentaPrestamosOut;
          let detalleReportin:RepNomEstCuentaPrestamosIn = new RepNomEstCuentaPrestamosIn();

          detalleReportin.TipoPrestamo = this.prestamo.value["type"];
          detalleReportin.Tabajador_D = this.prestamo.value["employeeF"];
          detalleReportin.Tabajador_H = this.prestamo.value["employeeU"];
          detalleReportin.Contrato_D = this.prestamo.value["contractF"];
          detalleReportin.Contrato_H = this.prestamo.value["contractU"];
          detalleReportin.Fecha_D = dateF;
          detalleReportin.Fecha_H = dateU;
          detalleReportin.Frecuencia = this.prestamo.value["frequency"];
          detalleReportin.Pagados = this.prestamo.value["paid"];
          detalleReportin.Pagados = this.prestamo.value["method"];

          let msjerror: String;
          this.global.showLoading();

          this.repNom.repNomPrestamos(detalleReportin).subscribe(dev =>{
            if (dev.RepEdoCtaPrestamoResult.Error.toString() == "") {
              msjerror = "No hay información para mostrar"
            } else {
              msjerror = dev.RepEdoCtaPrestamoResult.Error.toString();
            }
            
              if (dev.RepEdoCtaPrestamoResult.ResumenPrestaciones.length == 0 || dev.RepEdoCtaPrestamoResult.Error) {

                swal(
                  dev.RepEdoCtaPrestamoResult.Error ? "ERROR": "INFO", 
                  msjerror.toString(),
                  dev.RepEdoCtaPrestamoResult.Error ?  "error": "info"
                  )
                  .then((value) => {
                    if (value || value == null) {
                      this.global.hideLoading();
                    }
                  });


              } else{
                detalleReportOut = dev;
                this.pdf.pdfEdoCuentaPrestamo(detalleReportOut,detalleReportin);
                this.global.hideLoading();
              
              }
           
            
          },
          error => {
          
          })
        }
 
     }else{
       if(this.prestamo.value["sendTo"]==""){
         swal("","Debe seleccionar una opción","info")
         .then((value) => {
           if (value || value==null) {
            
           }
         });
       } 
     }
  }



  changeEmployee(code: String) {
    this.empU = code;
  }
  changeContract(code: String) {
    this.conU = code;
  }

  validarFecha(dateD, dateH): boolean{
    if (dateD > dateH)
      return false;
    else
      return true;
  }
}


