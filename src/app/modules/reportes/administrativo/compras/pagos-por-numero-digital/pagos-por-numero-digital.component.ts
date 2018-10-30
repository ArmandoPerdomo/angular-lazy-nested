import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ListaMonedaService } from '../../../../../core/services/listas/lista-monedas.service';
import { ListaMonedasIn } from '../../../../../abstract/DTO/in/listaMonedasIn';
import { Observable } from 'rxjs';
import { ListaZonasService } from '../../../../../core/services/listas/lista-zonas.service';
import { ListaSegmentosService } from '../../../../../core/services/listas/lista-segmentos.service';
import { ListaCondicionesService } from '../../../../../core/services/listas/lista-condiciones.service';
import { ListaZonasIn } from '../../../../../abstract/DTO/in/listaZonasIn';
import { ListaSegmentoIn } from '../../../../../abstract/DTO/in/listaSegmentoIn';
import { ListaProveedoresService } from '../../../../../core/services/listas/lista-proveedores.service';
import { ListaProveedoresIn } from '../../../../../abstract/DTO/in/listaProveedoresin';
import { FormControlService } from '../../../../../core/services/form-control.service';
import { Router } from '@angular/router';
import { RepAdmPagoxNumeroOut } from '../../../../../abstract/DTO/out/reportesAdmCompras/repAdmPagoxNumero/repAdmPagoxNumeroOut';
import { RepAdmPagoxNumeroIn } from '../../../../../abstract/DTO/in/reporteAdmCompras/repAdmPagoxNumeroIn';
import { RepAdmPagoxNumeroService } from '../../../../../core/services/compras/repAdmPagoxNumero.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Globals } from '../../../../../core/services/globals.service';
import { PdfPagoNumeroService } from '../../../../../core/services/exportables/administrativo/compras/pago-numero/pdf-pago-numero.service';


const now = new Date();
@Component({
  selector: 'app-listado-pagos',
  templateUrl: './pagos-por-numero-digital.component.html',
  styleUrls: ['./pagos-por-numero-digital.component.css']
})
export class PagosPorNumeroDigitalComponent implements OnInit {
titListadoPagos: string;

//? Variales para combos
proveedorCallback: Observable<any>;
monedaCallback: Observable<any>;
zonaCallback: Observable<any>;
segmentoCallback: Observable<any>;
condicionCallback: Observable<any>;

//? Para validacion de numero
campoNumero : Boolean = true;


//? Para el change del combo
cProvedor: String;


//? Models
env = '';
numeroD : Number;
numeroH: Number;
  //? Fecha
  fechaD: NgbDateStruct;
  fechaH: NgbDateStruct;
  maxDate: NgbDateStruct;
provD: String;
provH: String;
monedaC: String;
zonD: String;
zonH: String;
segD: String;
segH: String;
cond: String;


ListadoPagos: FormGroup;
constructor(
  public listaM: ListaMonedaService,
  public listaZ: ListaZonasService, 
  public listaSeg: ListaSegmentosService,
  public listaCon: ListaCondicionesService, 
  public listaPro: ListaProveedoresService,
  public formService: FormControlService, 
  public pdf: PdfPagoNumeroService,
  public router: Router,
  private repAdm: RepAdmPagoxNumeroService, 
  public global: Globals){
    this.titListadoPagos = 'Pago por número';
    this.env = '';
    this.numeroD = 0;
    this.numeroH = 999999999;

    this.fechaH = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
    this.maxDate = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
    this.fechaD = {year: now.getFullYear(), month: 1 , day: 1};


  }

  limpiar() {
    this.cleanProveedorCodigo(null);
    this.cleanCondicionCodigo(null);
    this.cleanMonedaCodigo(null);
    this.cleanZonaCodigo(null);
    this.cleanSegmentoCodigo(null);
    this.numeroD = 0;
    this.numeroH = 999999999;
    this.fechaH = { day: now.getDate(), month: now.getMonth() + 1,year: now.getFullYear()};
    this.fechaD = { day: 1, month: 1 ,year: now.getFullYear()};
    this.env = '';
  }

  ngOnInit() {
    this.ListadoPagos = new FormGroup ({
      numD: new FormControl('', [Validators.required]),
      numH: new FormControl('', [Validators.required]),
      dateD: new FormControl('', [Validators.required]),
      dateH: new FormControl('', [Validators.required]),
      proveedorD: new FormControl(''),
      proveedorH: new FormControl(''),
      moneda: new FormControl(''),
      zonaD: new FormControl(''),
      zonaH: new FormControl(''),
      segmentoD: new FormControl(''),
      segmentoH: new FormControl(''),
      condicion: new FormControl(''),
      enviar: new FormControl('',  [Validators.required])
    });

     //? Set variables para el combo IN
     let lpro: ListaProveedoresIn = new ListaProveedoresIn();
     this.proveedorCallback = this.listaPro.listaProveedores(lpro);

      let lmon: ListaMonedasIn = new ListaMonedasIn();
      this.monedaCallback = this.listaM.listaMonedas(lmon);

      let lzona: ListaZonasIn = new ListaZonasIn();
      this.zonaCallback = this.listaZ.listaZona(lzona);

      let lseg: ListaSegmentoIn = new ListaSegmentoIn();
      this.segmentoCallback = this.listaSeg.listaSegmento(lseg);

     // let lcon: ListaCondicionesIn = new ListaCondicionesIn();
      this.condicionCallback = this.listaCon.listaCondicionesPagoXNumero();


  }

  goBack(): void {
    this.router.navigate([`app/reportes/dashboard`]);
  }



  Aceptar() {
    //* validando Formulario
    let fechaDesde = this.ListadoPagos.value.dateD.year.toString()+'-'+this.ListadoPagos.value.dateD.month.toString()+'-'+this.ListadoPagos.value.dateD.day.toString();
    let fechaHasta = this.ListadoPagos.value.dateH.year.toString()+'-'+this.ListadoPagos.value.dateH.month.toString()+'-'+this.ListadoPagos.value.dateH.day.toString();
    this.formService.markFormGroupTouched(this.ListadoPagos);
    if (this.ListadoPagos.valid)  {

      if (this.ListadoPagos.value["enviar"] == "Listado"  && this.validarNumero(this.ListadoPagos.value["numD"], this.ListadoPagos.value["numH"]) && this.validarFecha( this.ListadoPagos.value["dateD"], this.ListadoPagos.value["dateH"])){
        this.campoNumero = true;
        this.ListadoPagos.controls["dateD"].setValue(fechaDesde)
        this.ListadoPagos.controls["dateH"].setValue(fechaHasta)

        this.router.navigate([`${this.router.url}/detalle`], { queryParams: this.ListadoPagos.value });
        //this.router.navigate(['Reportes/Administrativo/Compras/ReporteDetallesPagosPorNumero'], { queryParams: this.ListadoPagos.value });
      }else  if (this.ListadoPagos.value["enviar"] == "PDF"  && this.validarNumero(this.ListadoPagos.value["numD"], this.ListadoPagos.value["numH"]) && this.validarFecha( this.ListadoPagos.value["dateD"], this.ListadoPagos.value["dateH"])){

        this.campoNumero = true;
        let detalleReportOut: RepAdmPagoxNumeroOut;
        let detalleReportIn:RepAdmPagoxNumeroIn = new RepAdmPagoxNumeroIn();
        detalleReportIn = new RepAdmPagoxNumeroIn();



        detalleReportIn.NumeroD= this.ListadoPagos.value["numD"]
        detalleReportIn.Numeroh= this.ListadoPagos.value["numH"]
        detalleReportIn.Co_ProvD = this.ListadoPagos.value["proveedorD"];
        detalleReportIn.Co_Provh = this.ListadoPagos.value["proveedorH"];
        detalleReportIn.FechaD = fechaDesde;
        detalleReportIn.Fechah = fechaHasta;
        detalleReportIn.Moneda = this.ListadoPagos.value["moneda"];
        detalleReportIn.Moneda = this.ListadoPagos.value["moneda"];
        detalleReportIn.Co_SegmentoD = this.ListadoPagos.value["segmentoD"];
        detalleReportIn.Co_Segmentoh = this.ListadoPagos.value["segmentoH"];
        detalleReportIn.Co_ZonaD = this.ListadoPagos.value["zonaD"];
        detalleReportIn.Co_Zonah = this.ListadoPagos.value["zonaH"];
        detalleReportIn.Condicion = this.ListadoPagos.value["condicion"];
        this.global.showLoading();
        let msjerror;
        this.repAdm.repCxP(detalleReportIn).subscribe(dev =>{

          if(dev.RepPagoxNumeroResult.Error.toString()==""){
            msjerror = "No hay información para mostrar"
          }else{
            msjerror =dev.RepPagoxNumeroResult.Error.toString();
          } 
          if(dev.RepPagoxNumeroResult.Error || dev.RepPagoxNumeroResult.PagosXNumero.length==0){

                swal(
                dev.RepPagoxNumeroResult.Error? "ERROR":"INFO",
                msjerror,
                dev.RepPagoxNumeroResult.Error? "error":"info")
                .then((value) => {
                  if (value || value==null) {
                    this.global.hideLoading();
                  }
                });


          }else{
            detalleReportOut = dev;
            this.global.hideLoading();
            this.pdf.pdfPagoXNumero(detalleReportOut, detalleReportIn);
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

  //
  }
 //? limpiar 
 cleanProveedorCodigo(codigo: String) {
  this.provD=codigo;
  this.provH=codigo;
}

cleanCondicionCodigo(codigo: String) {
  this.cond = codigo;
}
cleanMonedaCodigo(codigo: String) {
  this.monedaC = codigo;
}
cleanZonaCodigo(codigo: String) {
  this.zonD=codigo;
  this.zonH=codigo;
}
cleanSegmentoCodigo(codigo: String) {
  this.segD=codigo;
  this.segH=codigo;
}

  //? Cambio en el combo
  changeProvedorCodigo(codigo: String) {
    this.provH=codigo;
  }
  changeZonaCodigo(codigo: String) {
    this.zonH=codigo;
  }
  changeSegmentoCodigo(codigo: String) {
    this.segH=codigo;
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
