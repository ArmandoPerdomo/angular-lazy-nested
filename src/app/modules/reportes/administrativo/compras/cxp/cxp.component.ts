import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ListaMonedasIn } from '../../../../../abstract/DTO/in/listaMonedasIn';
import { ListaZonasIn } from '../../../../../abstract/DTO/in/listaZonasIn';
import { ListaSegmentoIn } from '../../../../../abstract/DTO/in/listaSegmentoIn';
import { ListaMonedaService } from '../../../../../core/services/listas/lista-monedas.service';
import { ListaZonasService } from '../../../../../core/services/listas/lista-zonas.service';
import { ListaSegmentosService } from '../../../../../core/services/listas/lista-segmentos.service';
import { ListaCondicionesService } from '../../../../../core/services/listas/lista-condiciones.service';
import { ListaProveedoresIn } from '../../../../../abstract/DTO/in/listaProveedoresin';
import { ListaProveedoresService } from '../../../../../core/services/listas/lista-proveedores.service';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ListaTipoService } from '../../../../../core/services/listas/lista-tipo.service';
import { RepAdmCxPPorProveedorService } from '../../../../../core/services/compras/repAdmCxPPorProveedor.service';
import { RepAdmCxPPorProveedorIn } from '../../../../../abstract/DTO/in/reporteAdmCompras/repAdmCxPPorProveedorIn';
import { RepAdmCxPPorProveedorOut } from '../../../../../abstract/DTO/out/reportesAdmCompras/repAdmCxPPorProveedor/repAdmCxPPorProveedorOut';
import { FormControlService } from '../../../../../core/services/form-control.service';
import { Globals } from '../../../../../core/services/globals.service';
import { PdfCxpProveedorService } from '../../../../../core/services/exportables/administrativo/compras/cxp-proveedor/pdf-cxp-proveedor.service';
import { ExcelService } from '../../../../../core/services/exportables/parent/excel.service';

const now = new Date();
@Component({
  selector: 'app-cxp',
  templateUrl: './cxp.component.html',
  styleUrls: ['./cxp.component.css']
})
export class CxpComponent implements OnInit {
titCxP: string;
ListadoCxP: FormGroup;

//? Variales para combo
proveedorCallback: Observable<any>;
monedaCallback: Observable<any>;
zonaCallback: Observable<any>;
segmentoCallback: Observable<any>;
condicionCallback: Observable<any>;
tipoCallback: Observable<any>;

//? Para validacion de numero
campoNumero : Boolean = true;

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
  tipoL: String;
  cond: String
  env = '';


  constructor(
    public listaM: ListaMonedaService, 
    public listaT: ListaTipoService, 
    public pdf: PdfCxpProveedorService,
    public excel: ExcelService,
    public listaZ: ListaZonasService, 
    public listaSeg: ListaSegmentosService, 
    public repAdmCxP: RepAdmCxPPorProveedorService, 
    public formService: FormControlService,
    public listaCon: ListaCondicionesService, 
    public listaPro: ListaProveedoresService, 
    public router: Router,
    public global: Globals) {
      
    }

  ngOnInit() {
    this.titCxP = 'Compra por proveedor CxP';
    this.numeroD = 0;
    this.numeroH = 999999999;
    this.env = '';
    this.ListadoCxP = new FormGroup ({
      numD: new FormControl('', [Validators.required]),
      numH: new FormControl('', [Validators.required]),
      tipo: new FormControl(''),
      dateD: new FormControl('', [Validators.required]),
      dateH: new FormControl('', [Validators.required]),
      proveedorD: new FormControl('', ),
      proveedorH: new FormControl('', ),
      moneda: new FormControl('', ),
      zonaD: new FormControl('', ),
      zonaH: new FormControl('', ),
      segmentoD: new FormControl('',),
      segmentoH: new FormControl('',),
      condicion: new FormControl('',),
      enviar: new FormControl('', [Validators.required])
  });

  this.fechaH = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  this.maxDate = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  this.fechaD = {year: now.getFullYear(), month: 1 , day: 1};


  //? Set variables para el combo
  let lpro: ListaProveedoresIn = new ListaProveedoresIn();
  this.proveedorCallback = this.listaPro.listaProveedores(lpro);

  let lmon: ListaMonedasIn = new ListaMonedasIn();
  this.monedaCallback = this.listaM.listaMonedas(lmon);

  let lzona: ListaZonasIn = new ListaZonasIn();
  this.zonaCallback = this.listaZ.listaZona(lzona);

  let lseg: ListaSegmentoIn = new ListaSegmentoIn();
  this.segmentoCallback = this.listaSeg.listaSegmento(lseg);

  this.condicionCallback = this.listaCon.listaCondicionesPagoXNumero();
  this.tipoCallback = this.listaT.listaTipoCxCCliente();
  }
  goBack(): void {
    this.router.navigate([`app/reportes/dashboard`]);
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

  cleanTipoCodigo(codigo: String) {
    this.tipoL = codigo;
  }
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

  limpiar() {
    this.cleanTipoCodigo(null);
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
  
    Aceptar() {
      //* validando Formulario
      let fechaDesde = this.ListadoCxP.value.dateD.year.toString()+'-'+this.ListadoCxP.value.dateD.month.toString()+'-'+this.ListadoCxP.value.dateD.day.toString();
      let fechaHasta = this.ListadoCxP.value.dateH.year.toString()+'-'+this.ListadoCxP.value.dateH.month.toString()+'-'+this.ListadoCxP.value.dateH.day.toString();
      this.formService.markFormGroupTouched(this.ListadoCxP);
      if (this.ListadoCxP.valid){
  
        if (this.ListadoCxP.value["enviar"] == "Listado"  && this.validarNumero(this.ListadoCxP.value["numD"], this.ListadoCxP.value["numH"]) && this.validarFecha( this.ListadoCxP.value["dateD"], this.ListadoCxP.value["dateH"])){
          this.campoNumero = true;
          this.ListadoCxP.controls["dateD"].setValue(fechaDesde)
          this.ListadoCxP.controls["dateH"].setValue(fechaHasta)
  
         this.router.navigate([`${this.router.url}/detalle`], { queryParams: this.ListadoCxP.value });
        
        }else  if (this.ListadoCxP.value["enviar"] == "PDF"  && this.validarNumero(this.ListadoCxP.value["numD"], this.ListadoCxP.value["numH"]) && this.validarFecha( this.ListadoCxP.value["dateD"], this.ListadoCxP.value["dateH"])){

          this.campoNumero = true;
          let detalleReportOut: RepAdmCxPPorProveedorOut;
          let detalleReportIn:RepAdmCxPPorProveedorIn = new RepAdmCxPPorProveedorIn();
          detalleReportIn = new RepAdmCxPPorProveedorIn();
  
  
  
          detalleReportIn.Nro_doc_D= this.ListadoCxP.value["numD"]
          detalleReportIn.Nro_doc_H= this.ListadoCxP.value["numH"]
          detalleReportIn.Tipo_doc = this.ListadoCxP.value["tipo"]; 
          detalleReportIn.Fec_emision_D = fechaDesde;
          detalleReportIn.Fec_emision_H = fechaHasta;
          detalleReportIn.Co_prov_D = this.ListadoCxP.value["proveedorD"];
          detalleReportIn.Co_prov_H = this.ListadoCxP.value["proveedorH"];
          detalleReportIn.Condicion = this.ListadoCxP.value["condicion"];
          detalleReportIn.Co_mone = this.ListadoCxP.value["moneda"];
  
          detalleReportIn.Co_seg_D = this.ListadoCxP.value["segmentoD"];
          detalleReportIn.Co_seg_H = this.ListadoCxP.value["segmentoH"];
          detalleReportIn.Co_zon_D = this.ListadoCxP.value["zonaD"];
          detalleReportIn.Co_zon_H = this.ListadoCxP.value["zonaH"];
          let msjerror
          this.repAdmCxP.repDev(detalleReportIn).subscribe(dev =>{
            if(dev.CxPPorProveedorResult.Error.toString()==""){
              msjerror = "No hay información para mostrar"
            }else{
              msjerror =dev.CxPPorProveedorResult.Error.toString();
            }
            detalleReportOut = dev;
            if(dev.CxPPorProveedorResult.Error || dev.CxPPorProveedorResult.Proveedor.length==0){

                swal(
                dev.CxPPorProveedorResult.Error? "ERROR":"INFO",
                msjerror,
                dev.CxPPorProveedorResult.Error? "error":"info")
                .then((value) => {
                  if (value || value==null) {

                  }
                });

  
            }else{
              this.global.showLoading();
              this.pdf.PdfCxP(detalleReportOut);
              this.global.hideLoading();
            } 
          },
          error => {
          })
  
        }

        else if (this.ListadoCxP.value["enviar"] == "Excel"){
            this.excel.exportAsExcelFile([
              { A:"S", B:"h", C:"e", D:"e", E:"t", F:"J", G:"S" },
              { A: 1,  B: 2,  C: 3,  D: 4,  E: 5,  F: 6,  G: 7  },
              { A: 2,  B: 3,  C: 4,  D: 5,  E: 6,  F: 7,  G: 8  },
              { A: "Austria"}
            ],"test");
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
}
