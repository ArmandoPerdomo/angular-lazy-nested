import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ListaMonedasIn } from '../../../../../../../abstract/DTO/in/listaMonedasIn';
import { ListaMonedaService } from '../../../../../../../core/services/listas/lista-monedas.service';
import { Globals } from '../../../../../../../core/services/globals.service';
import { FormControlService } from '../../../../../../../core/services/form-control.service';
import { Router } from '@angular/router';
import { ListaBancoFormatoDigitalService } from '../../../../../../../core/services/listas/section-mock/lista-banco-formato-digital.service';
import { RepAdmMovBancoxNumeroService } from '../../../../../../../core/services/caja-blanco/repAdmMovBancoxNumero.service';
import { RepAdmMovBancoxNumeroOut } from '../../../../../../../abstract/DTO/out/reportesAdmCajaBlanco/repAdmMovBancoxNumero/repAdmMovBancoxNumeroOut';
import { RepAdmMovBancoxNumeroIn } from '../../../../../../../abstract/DTO/in/reporteAdmCajaBlanco/repAdmMovBancoxNumeroIn';
import { ListaCondicionesService } from '../../../../../../../core/services/listas/lista-condiciones.service';
import { ListaCuentasIn } from '../../../../../../../abstract/DTO/in/listaCuentasIn';
import { ListaCuentasIngresoIn } from '../../../../../../../abstract/DTO/in/listaCuentasIngresoIn';
import { PdfMovimientoFormatoService } from '../../../../../../../core/services/exportables/administrativo/caja-banco/movimiento-formato/pdf-movimiento-formato.service';

@Component({
  selector: 'app-movimiento-formato-digital',
  templateUrl: './movimiento-formato-digital.component.html',
  styleUrls: ['./movimiento-formato-digital.component.css']
})
export class MovimientoFormatoDigitalComponent implements OnInit {
 title: string;
   //? Models
   env = '';
   num : String;
   numH : String;
   ctaD : String;
   ctaH : String;
   ctaIng : String;
   tmov : String;
   con : String;
   omov : String;
   mon : String;
   ctaIna : String;
   cdcion : String;

   //? Variales para combos
   cuentaCallback: Observable<any>;
   cuentaIngCallback: Observable<any>;
   tipoMovCallback: Observable<any>;
   monedaCallback: Observable<any>;
   todosCallback: Observable<any>;
   origenMovCallback: Observable<any>;
   condicionCallback: Observable<any>;

   //? Variable para el servicio
   detalleReportOut: RepAdmMovBancoxNumeroOut;
 
 MBanco: FormGroup;

  constructor(
    public listaM: ListaMonedaService,
    public listaC: ListaCondicionesService,
    public listaT: ListaBancoFormatoDigitalService,
    public global: Globals,
    public router: Router,
    public pdf: PdfMovimientoFormatoService,
    public repAdm: RepAdmMovBancoxNumeroService,
    public formService: FormControlService) {
     
  }

  ngOnInit() {
    this.title = 'Movimiento de banco formato digital';
    this.num = '';

    this.MBanco = new FormGroup ({
      numero: new FormControl(''),
      numeroH: new FormControl(''),
      cuentaD: new FormControl(''),
      cuentaH: new FormControl(''),
      cuentaIng: new FormControl(''),
      tipoMov: new FormControl(''),
      conciliado: new FormControl(''),
      origenMov: new FormControl(''),
      moneda: new FormControl(''),
      cuentaIna: new FormControl(''),
      condicion: new FormControl(''),
      enviar: new FormControl('',  [Validators.required])
    });


    let lmon: ListaMonedasIn = new ListaMonedasIn();
    this.monedaCallback = this.listaM.listaMonedas(lmon);
    
    let lcta: ListaCuentasIn = new ListaCuentasIn();
    this.cuentaCallback = this.listaT.listaCuenta(lcta);

    let lctai: ListaCuentasIngresoIn = new ListaCuentasIngresoIn();
    this.cuentaIngCallback = this.listaT.listaCuentaIngreso(lctai);  
    
    this.tipoMovCallback = this.listaT.listaTipoMov();
    this.todosCallback = this.listaT.listaConciliado();
    this.origenMovCallback = this.listaT.listaOrigenMovimiento();
    this.condicionCallback = this.listaC.listaCondicionesPagoXNumero();


  }

  goBack(): void {
    this.router.navigate([`app/reportes/dashboard`]);
  }

  limpiar(){
    this.num = '';
  }

  changeCuentaCodigo(codigo: String) {
    this.ctaH=codigo;
  }

  Aceptar() {
    
    this.formService.markFormGroupTouched(this.MBanco);
    if (this.MBanco.valid)  {

     if (this.MBanco.value["enviar"] == "Listado"){
        this.router.navigate([`${this.router.url}/detalle`], { queryParams: this.MBanco.value });
      }else  if (this.MBanco.value["enviar"] == "PDF"){


        let detalleReportOut: RepAdmMovBancoxNumeroOut;
        let detalleReportIn:RepAdmMovBancoxNumeroIn = new RepAdmMovBancoxNumeroIn();
  

        detalleReportIn.Numero_d = this.MBanco.value['numero'];
        detalleReportIn.Numero_h = this.MBanco.value['numero'];
      //  detalleReportIn.Numero_h = this.MBanco.value['numeroH'];

        detalleReportIn.CodigoCuenta_d = this.MBanco.value['cuentaD'];
        detalleReportIn.CodigoCuenta_h = this.MBanco.value['cuentaH'];

        detalleReportIn.CuentaIngreso_d = this.MBanco.value['cuentaIng'];
        detalleReportIn.CuentaIngreso_h = this.MBanco.value['cuentaIng'];
    
        detalleReportIn.TipoMovim = this.MBanco.value['tipoMov'];
        detalleReportIn.Conciliado = this.MBanco.value['conciliado'];
        detalleReportIn.OrigenMovim = this.MBanco.value['origenMov'];
        detalleReportIn.Moneda = this.MBanco.value['moneda'];
        detalleReportIn.CuentaInactiva = this.MBanco.value['cuentaIna'];
        detalleReportIn.Condicion = this.MBanco.value['condicion'];


        let msjerror
        this.global.showLoading();
        this.repAdm.repBancoxNumero(detalleReportIn).subscribe(dev =>{
           
;         if(dev.RepMovBancoxNumeroResult.Error.toString()==""){
            msjerror = "No hay información que imprimir"
          }else{
            msjerror =dev.RepMovBancoxNumeroResult.Error.toString();
          }
          if(dev.RepMovBancoxNumeroResult.Error || dev.RepMovBancoxNumeroResult.Documeto.length==0 || dev.RepMovBancoxNumeroResult.Documeto==null){
                swal(
                  dev.RepMovBancoxNumeroResult.Error? "ERROR":"INFO",
                  msjerror,
                  dev.RepMovBancoxNumeroResult.Error? "error":"info")
                .then((value) => {
                  if (value || value==null) {
                    this.global.hideLoading();
                  }
                });


          }else 
          if( dev.RepMovBancoxNumeroResult.Documeto.length>14999 ){

            swal("","El número de datos excede el límite, establecer otro rango","error")
            .then((value) => {
              if (value || value==null) {
                this.global.hideLoading();
              }
            });

          }else{
            detalleReportOut = dev;
            this.global.hideLoading();
            this.pdf.pdfMovimientoFormatoDigital(detalleReportOut);
          //  this.pdfService.pdfMBancoxNumero(detalleReportOut);
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


}
