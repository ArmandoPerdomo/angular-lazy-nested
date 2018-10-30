import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ListaMonedasIn } from '../../../../../abstract/DTO/in/listaMonedasIn';
import { ListaZonasIn } from '../../../../../abstract/DTO/in/listaZonasIn';
import { ListaSegmentoIn } from '../../../../../abstract/DTO/in/listaSegmentoIn';
import { ListaMonedaService } from '../../../../../core/services/listas/lista-monedas.service';
import { ListaZonasService } from '../../../../../core/services/listas/lista-zonas.service';
import { ListaSegmentosService } from '../../../../../core/services/listas/lista-segmentos.service';
import { ListaCondicionesService } from '../../../../../core/services/listas/lista-condiciones.service';
import { ListaClienteService } from '../../../../../core/services/listas/listar-clientes.service';
import { ListarClientesIn } from '../../../../../abstract/DTO/in/listarClientesIn';
import { ListaVendedoresIn } from '../../../../../abstract/DTO/in/listaVendedoresIn';
import { ListaVendedoresService } from '../../../../../core/services/listas/lista-vendedores.service';
import { ComboContrutodoComponent } from '../../../../compartidos/utils/combo-contrutodo/combo-contrutodo.component';
import {ListaTipoService} from "../../../../../core/services/listas/lista-tipo.service";
import {FormControlService} from "../../../../../core/services/form-control.service";
import {Router, ActivatedRoute} from "@angular/router";
import {RepAdmFormatoCxCClientesService} from "../../../../../core/services/ventas/repAdmFormatosCxcClientes.service";
import {Globals} from "../../../../../core/services/globals.service";
import {RepAdmFormatosCxCClientesOut} from "../../../../../abstract/DTO/out/reportesAdmVentas/repAdmFormatosCxcClientesOut/repAdmFormatosCxcClientesOut";
import {RepAdmFormatosCxcClientesIn} from "../../../../../abstract/DTO/in/reportesAdmVentas/repAdmFormatosCxCClientesIn";
import { PdfCxcClienteService } from '../../../../../core/services/exportables/administrativo/ventas/cxc-cliente/pdf-cxc-cliente.service';
const now = new Date();
@Component({
  selector: 'app-cxc',
  templateUrl: './cxc.component.html',
  styleUrls: ['./cxc.component.css']
})
export class CxcComponent implements OnInit {

  disabledVen: Boolean = false
   tilCxC: string;
  vendedoresCallback: Observable<any>;
  clientesCallback: Observable<any>;
  tipoCallback: Observable<any>;
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

  monedaC: String;
  zonD: String;
  zonH: String;
  segD: String;
  segH: String;
  tipoL: String;
  cliD: String;
  cliH: String;
  venD: String;
  venH: String;
  cond: String; 
  CxCClientes: FormGroup;

    constructor(
    public listaM: ListaMonedaService,
    public listaZ: ListaZonasService,
    public listaSeg: ListaSegmentosService,
    public listaCon: ListaCondicionesService,
    public listaT: ListaTipoService,
    public listaCliService: ListaClienteService,
    public listaVendedorS: ListaVendedoresService,
    public formService: FormControlService,
    public pdf: PdfCxcClienteService, 
    public router: Router,
    public global: Globals,
    public repAdmCxc: RepAdmFormatoCxCClientesService) {}

  cleanTipoCodigo(codigo: String) {
    this.tipoL = codigo;
  }
  cleanClienteCodigo(codigo: String) {
    this.cliD=codigo;
    this.cliH=codigo;
  }
  cleanVendedorCodigo(codigo: String) {
    this.venD=codigo;
    this.venH=codigo;
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
    this.cleanClienteCodigo(null);
    this.cleanVendedorCodigo(null);
    this.cleanCondicionCodigo(null);
    this.cleanMonedaCodigo(null);
    this.cleanZonaCodigo(null);
    this.cleanSegmentoCodigo(null);

     this.env = '';
     this.numeroD = 0;
     this.numeroH = 999999999;
    this.maxDate = { day: now.getDate(), month: now.getMonth() + 1,year: now.getFullYear()};
    this.fechaH = { day: now.getDate(), month: now.getMonth() + 1,year: now.getFullYear()};
    this.fechaD = { day: 1, month: 1 ,year: now.getFullYear()};

  }
        
  ngOnInit() {
    this.tilCxC = 'Compra por cliente CxC';
    this.env = '';
    this.numeroD = 0;
    this.numeroH = 999999999;
    this.fechaH = { day: now.getDate(), month: now.getMonth() + 1,year: now.getFullYear()};
    this.fechaD = { day: 1, month: 1 ,year: now.getFullYear()};
    this.maxDate = { day: now.getDate(), month: now.getMonth() + 1,year: now.getFullYear()};
    this.CxCClientes = new FormGroup ({
      numD: new FormControl('', [Validators.required]),
      numH: new FormControl('', [Validators.required]),
      dateD: new FormControl('', [Validators.required]),
      dateH: new FormControl('', [Validators.required]),
      clienteD: new FormControl(''),
      clienteH: new FormControl(''),
      vendedorD: new FormControl(''),
      vendedorH: new FormControl(''),
      tipo: new FormControl(''),
      moneda: new FormControl(''),
      zonaD: new FormControl(''),
      zonaH: new FormControl(''),
      segmentoD: new FormControl(''),
      segmentoH: new FormControl(''),
      condicion: new FormControl(''),
      enviar: new FormControl('',[Validators.required])
    });

    this.CxCClientes.controls.clienteD.disable();

     // let ltip: ListaMonedasIn = new ListaMonedasIn();
      this.tipoCallback = this.listaT.listaTipoCxCCliente();

      let lven: ListaVendedoresIn = new ListaVendedoresIn();
      this.vendedoresCallback = this.listaVendedorS.listaVendedores(lven);

      let lcli: ListarClientesIn = new ListarClientesIn();
      this.clientesCallback = this.listaCliService.asCli(lcli);

      let lmon: ListaMonedasIn = new ListaMonedasIn();
      this.monedaCallback = this.listaM.listaMonedas(lmon);

      let lzona: ListaZonasIn = new ListaZonasIn();
      this.zonaCallback = this.listaZ.listaZona(lzona);

      let lseg: ListaSegmentoIn = new ListaSegmentoIn();
      this.segmentoCallback = this.listaSeg.listaSegmento(lseg);

     // let lcon: ListaCondicionesIn = new ListaCondicionesIn();
      this.condicionCallback = this.listaCon.listaCondicionesPagoXNumero();
  }

  changeClienteCodigo(codigo: String) {
    this.CxCClientes.controls.clienteD.enable();

    this.cliH=codigo;
  }
  changeVendedorCodigo(codigo: String) {
    this.venH=codigo;
  }
  changeZonaCodigo(codigo: String) {
    this.zonH=codigo;
  }
  changeSegmentoCodigo(codigo: String) {
    this.segH=codigo;
  }

  goBack(): void {
    this.router.navigate([`app/reportes/dashboard`]);
  }



  Aceptar() {
    //* validando Formulario
    let fechaDesde = this.CxCClientes.value.dateD.year.toString()+'-'+this.CxCClientes.value.dateD.month.toString()+'-'+this.CxCClientes.value.dateD.day.toString();
    let fechaHasta = this.CxCClientes.value.dateH.year.toString()+'-'+this.CxCClientes.value.dateH.month.toString()+'-'+this.CxCClientes.value.dateH.day.toString();
    this.formService.markFormGroupTouched(this.CxCClientes);
    if (this.CxCClientes.valid){

      if (
        this.CxCClientes.value["enviar"] == "Listado"  && this.validarNumero(this.CxCClientes.value["numD"], this.CxCClientes.value["numH"]) && this.validarFecha( this.CxCClientes.value["dateD"], this.CxCClientes.value["dateH"]))
        {
        this.campoNumero = true;
        this.CxCClientes.controls["dateD"].setValue(fechaDesde)
        this.CxCClientes.controls["dateH"].setValue(fechaHasta)
        this.router.navigate([`${this.router.url}/detalle`], { queryParams: this.CxCClientes.value });
       }
       else  if (this.CxCClientes.value["enviar"] == "PDF"  && this.validarNumero(this.CxCClientes.value["numD"], this.CxCClientes.value["numH"]) && this.validarFecha( this.CxCClientes.value["dateD"], this.CxCClientes.value["dateH"])){
        this.campoNumero = true;
        let detalleReportOut: RepAdmFormatosCxCClientesOut;
        let detalleReportIn:  RepAdmFormatosCxcClientesIn = new RepAdmFormatosCxcClientesIn();
        detalleReportIn.Nro_doc_D = this.CxCClientes.value["numD"];
        detalleReportIn.Nro_doc_H = this.CxCClientes.value["numH"];
        detalleReportIn.Fec_emis_D = fechaDesde;
        detalleReportIn.Fec_emis_H = fechaHasta;
        detalleReportIn.Co_mone = this.CxCClientes.value["moneda"];
        detalleReportIn.Co_seg_D = this.CxCClientes.value["segmentoD"];
        detalleReportIn.Co_seg_H = this.CxCClientes.value["segmentoH"];
        detalleReportIn.Co_zon_D = this.CxCClientes.value["zonaD"];
        detalleReportIn.Co_zon_H = this.CxCClientes.value["zonaH"];
        detalleReportIn.Condicion = this.CxCClientes.value["condicion"];
        this.global.showLoading();
        let msjerror : string;
        this.repAdmCxc.repDev(detalleReportIn).subscribe(dev =>{
          if(dev.RepCxCPorClienteResult.Error.toString()==""){
            msjerror = "No hay información que imprimir"
          }else{
            msjerror =dev.RepCxCPorClienteResult.Error.toString();
          }
          detalleReportOut = dev;
          this.global.hideLoading();
          if( dev.RepCxCPorClienteResult.Error || dev.RepCxCPorClienteResult.Clientes.length ==0){
                swal( 
                dev.RepCxCPorClienteResult.Error? "ERROR":"INFO",
                msjerror,
                dev.RepCxCPorClienteResult.Error? "error":"info")
                .then((value) => {
                  if (value || value==null) {
                  }
                });
          }else{
            this.global.showLoading();
            this.pdf.PdfCxC(detalleReportOut);
            this.global.hideLoading();
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
    }
    else
    {
       return true;
    }
   }
}
