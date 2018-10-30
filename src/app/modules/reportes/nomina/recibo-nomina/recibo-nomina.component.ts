import { Component, OnInit, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormControl,  Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ListaTrabajadoresIn } from '../../../../abstract/DTO/in/listaTrabajadoresIn';
import { ListaTrabajadoresService } from '../../../../core/services/listas/lista-trabajadores.service';
import { RepNomReciboPagoService } from '../../../../core/services/estados_de_cuenta/repNomReciboPago.service';
import { Router } from '@angular/router';
import { FormControlService } from '../../../../core/services/form-control.service';
import { Globals } from '../../../../core/services/globals.service';
import { RepNomReciboPagoOut } from '../../../../abstract/DTO/out/reportesNomina/repNomReciboPago/repNomReciboPagoOut';
import { RepNomReciboPagoIn } from '../../../../abstract/DTO/in/reportesNomina/repNomReciboPagoIn';
import { pdfReciboNominaService } from '../../../../core/services/exportables/nomina/recibo/pdf-recibo-nomina.service';

const now = new Date();
@Component({
  selector: 'app-recibo-nomina',
  templateUrl: './recibo-nomina.component.html',
  styleUrls: ['./recibo-nomina.component.css']
})
export class ReciboNominaComponent implements OnInit {
  tilReciboNomina: string;
  reciboTrabajadorOut: RepNomReciboPagoOut

  ReciboPago: FormGroup;
  carga: Boolean = false;
  registro: Boolean = false;

  acceptEvent = new EventEmitter();

  //? Variales para combo
  trabajadorCallback: Observable < any > ;

  //? Para validacion de numero
  campoNumero: Boolean = true;

  //? Models
  env: String;
  recD: String;
  recH: String;
  trab: String;
  //? Fecha
  fecD: NgbDateStruct;
  fecH: NgbDateStruct;
  maxDate: NgbDateStruct;

  constructor(
    public listaT: ListaTrabajadoresService,
    public repNom: RepNomReciboPagoService,
    public formService: FormControlService,
    public router: Router,
    public pdf: pdfReciboNominaService,
    public global: Globals) {
    this.tilReciboNomina = 'Recibo de pago';
    this.env = '';
    this.recD = "0";
    this.recH = "999999999";
    this.fecH = {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate()
    };
    this.maxDate = {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate()
    };
    this.fecD = {
      year: now.getFullYear(),
      month: 1,
      day: 1
    };
  }

  limpiar() {
    this.recD = "0";
    this.recH = "999999999";
    this.carga = false;

    this.cleanReciboTrabajador(null)
    this.fecH = {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate()
    };
    this.fecD = {
      year: now.getFullYear(),
      month: 1,
      day: 1
    };

  }

  ngOnInit() {
    this.ReciboPago = new FormGroup({
      reciboD: new FormControl(''),
      reciboH: new FormControl(''),
      fechaD: new FormControl('', [Validators.required]),
      fechaH: new FormControl('', [Validators.required]),
      trabajador: new FormControl('', [Validators.required]),
      enviar: new FormControl('', [Validators.required])
    });

    let ltrab: ListaTrabajadoresIn = new ListaTrabajadoresIn();
    this.trabajadorCallback = this.listaT.listaTrabajadores(ltrab);
  }

  Aceptar() {
    //* validando Formulario
    let fechaDesde = this.ReciboPago.value.fechaD.year.toString() + '-' + this.ReciboPago.value.fechaD.month.toString() + '-' + this.ReciboPago.value.fechaD.day.toString();
    let fechaHasta = this.ReciboPago.value.fechaH.year.toString() + '-' + this.ReciboPago.value.fechaH.month.toString() + '-' + this.ReciboPago.value.fechaH.day.toString();

    this.formService.markFormGroupTouched(this.ReciboPago);
    if (this.ReciboPago.valid) {

      if (this.ReciboPago.value["enviar"] == "Listado" && this.validarNumero(this.ReciboPago.value["reciboD"], this.ReciboPago.value["reciboH"])) {
        this.campoNumero = true;
        this.ReciboPago.controls["fechaD"].setValue(fechaDesde);
        this.ReciboPago.controls["fechaH"].setValue(fechaHasta);
        this.router.navigate([`${this.router.url}/detalle`], {
          queryParams: this.ReciboPago.value
        });
        //this.router.navigate(['/Reportes/Nomina/Recibos/ReporteReciboPago'], { queryParams: this.ReciboPago.value });

      } else if (this.ReciboPago.value["enviar"] == "PDF" && this.validarNumero(this.ReciboPago.value["reciboD"], this.ReciboPago.value["reciboH"])) {
        let msjerror;
        this.campoNumero = true;
        let detalleReportOut: RepNomReciboPagoOut;
        let detalleReportIn: RepNomReciboPagoIn = new RepNomReciboPagoIn();

        detalleReportIn.Recibo_D = this.ReciboPago.value["reciboD"]
        detalleReportIn.Recibo_H = this.ReciboPago.value["reciboH"]
        detalleReportIn.Tabajador_D = this.ReciboPago.value["trabajador"];
        detalleReportIn.Tabajador_H = this.ReciboPago.value["trabajador"];
        detalleReportIn.Fecha_D = fechaDesde;
        detalleReportIn.Fecha_H = fechaHasta;

        this.global.showLoading();
        this.repNom.repNomReciboPago(detalleReportIn).subscribe(dev => {
          if (dev.RepReciboPagoResult.Error.toString() == "") {
            msjerror = "No hay información para mostrar"
          } else {
            msjerror = dev.RepReciboPagoResult.Error.toString();
          }
            if (dev.RepReciboPagoResult.Recibos.length == 0 || dev.RepReciboPagoResult.Error) {

              swal( 
                dev.RepReciboPagoResult.Error ? "ERROR": "INFO", 
                msjerror,
                dev.RepReciboPagoResult.Error ?  "error": "info"
                )
                .then((value) => {
                  if (value || value == null) {
                    this.global.hideLoading();
                  }
                });


            } else {

              if (detalleReportIn.Recibo_D == detalleReportIn.Recibo_H) {
                detalleReportOut = dev;
                this.global.hideLoading();
                this.pdf.pdfReciboNomina(detalleReportOut);
              } else {
                swal("", "Indique un único número de recibo", "warning")
                  .then((value) => {
                    if (value || value == null) {
                      this.global.hideLoading();
                    }
                  });
              }
            }
          },
          error => {
          })

      }
    } else {
      if (this.ReciboPago.value["enviar"] == "") {
        swal("", "Debe seleccionar una opción válida", "info")
          .then((value) => {
            if (value || value == null) {

            }
        });
      }

    }

    //
  }

  goBack(): void {
    this.router.navigate([`app/reportes/dashboard`]);
  }

  //? Validaciones número
  validarNumero(reciboD, reciboH): boolean {
    if (reciboD > reciboH) {
      this.campoNumero = false
      return false;
    } else {
      return true;
    }
  }

  changeReciboTrabajador(codigo: String) {
    this.carga = true;
    let fechaDesde = this.ReciboPago.value.fechaD.year.toString() + '-' + this.ReciboPago.value.fechaD.month.toString() + '-' + this.ReciboPago.value.fechaD.day.toString();
    let fechaHasta = this.ReciboPago.value.fechaH.year.toString() + '-' + this.ReciboPago.value.fechaH.month.toString() + '-' + this.ReciboPago.value.fechaH.day.toString();
  
    let detalleReportIn: RepNomReciboPagoIn = new RepNomReciboPagoIn();
    detalleReportIn.Tabajador_D = this.ReciboPago.value["trabajador"];
    detalleReportIn.Tabajador_H = this.ReciboPago.value["trabajador"];
    detalleReportIn.Fecha_D = fechaDesde;
    detalleReportIn.Fecha_H = fechaHasta;
    this.repNom.repNomReciboPago(detalleReportIn).subscribe(dev => {
      this.reciboTrabajadorOut = dev;
      if (dev.RepReciboPagoResult.Recibos.length == 0) {
        this.registro = false;
      } else {
        this.registro = true;
      }
    });
    
  }

  cleanReciboTrabajador(codigo: String){
    this.trab = codigo;
  }

  numEventEmit(codigo: String) {
    this.recD = codigo;
    this.recH = codigo;
  }

  doubleclick() {
    this.ReciboPago.controls["enviar"].setValue("Listado")
    this.Aceptar();
  }

  filaSeleccionada(event: any) {
    let x = document.getElementsByClassName("gg");
    for (let i = 0; i < x.length; i++) {
      x[i].setAttribute("class", "gg fondoNormal");
    }
    event.setAttribute("class", "gg fondoDeClic");
  }
}