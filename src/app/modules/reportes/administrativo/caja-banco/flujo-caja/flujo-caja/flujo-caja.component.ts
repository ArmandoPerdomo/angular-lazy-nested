import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormControlService } from '../../../../../../core/services/form-control.service';
import { Router } from '@angular/router';
import { RepAdmDisponibilidadIn } from '../../../../../../abstract/DTO/in/reporteAdmCajaBlanco/repAdmDisponibilidadIn';
import { Globals } from '../../../../../../core/services/globals.service';
import { RepAdmDisponibilidadService } from '../../../../../../core/services/caja-blanco/repAdmDisponibilidad.service';
import { PdfDisponibilidadCajaService } from '../../../../../../core/services/exportables/administrativo/caja-banco/disponibilidad-caja/pdf-disponibilidad-caja.service';
import { RepAdmDisponibilidadOut } from '../../../../../../abstract/DTO/out/reportesAdmCajaBlanco/repAdmDisponibilidad/repAdmDisponibilidadOut';
import { Formato } from '../../../../../../abstract/DTO/out/reportesAdmCajaBlanco/repAdmDisponibilidad/Disponibilidad/Formato';

const now = new Date();
@Component({
  selector: 'app-flujo-caja',
  templateUrl: './flujo-caja.component.html',
  styleUrls: ['./flujo-caja.component.css']
})
export class FlujoCajaComponent implements OnInit {
  //? Models
  env = '';
  num: Number;
  //? Fecha
  fecha: NgbDateStruct;
  maxDate: NgbDateStruct;
  FlujoCaja: FormGroup;
  rows: Array < MockDisponibilidadOut > ;
  detalleReportOut: RepAdmDisponibilidadOut;
  constructor(
    public formService: FormControlService,
    public router: Router,
    public global: Globals,
    public repAdmDis: RepAdmDisponibilidadService,
    public pdf: PdfDisponibilidadCajaService) {}

  ngOnInit() {
    this.FlujoCaja = new FormGroup({
      numero: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      enviar: new FormControl('', [Validators.required])
    });
    this.fecha = {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate()
    };
    this.maxDate = {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate()
    };
    this.num = 0;
  }

  limpiar() {
    this.num = 0;
    this.fecha = {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate()
    };
  }

  goBack(): void {
    this.router.navigate([`app/reportes/dashboard`]);
  }

  Aceptar() {
    //* validando Formulario
    let fechaDesde = this.FlujoCaja.value.date.year.toString() + '-' + this.FlujoCaja.value.date.month.toString() + '-' + this.FlujoCaja.value.date.day.toString();
    this.formService.markFormGroupTouched(this.FlujoCaja);
    if (this.FlujoCaja.valid) {
      if (this.FlujoCaja.value["enviar"] == "Listado") {
        this.FlujoCaja.controls["date"].setValue(fechaDesde)
        this.router.navigate([`${this.router.url}/detalle`], {
          queryParams: this.FlujoCaja.value
        });

      } else if (this.FlujoCaja.value["enviar"] == "PDF") {
       // this.FlujoCaja.controls["date"].setValue(fechaDesde);
        let detalleReportIn: RepAdmDisponibilidadIn;
        detalleReportIn = new RepAdmDisponibilidadIn();
        detalleReportIn.Fec_emis = fechaDesde;
        detalleReportIn.Tasa = this.FlujoCaja.value["numero"];
        this.global.showLoading();    
        let msjerror;
        this.repAdmDis.repDis(detalleReportIn).subscribe(dev => {
            this.detalleReportOut = dev;
           console.log(this.detalleReportOut);
            this.global.hideLoading();
            if (dev.RepDisponibilidadResult.Error.toString() == "") {
              msjerror = "No hay información para mostrar"
            } else {
              msjerror = dev.RepDisponibilidadResult.Error.toString();
            }
            if (dev.RepDisponibilidadResult.Error || dev.RepDisponibilidadResult.Disponibilidad.Banco.length == 0 
              && dev.RepDisponibilidadResult.Disponibilidad.Caja.length == 0 
              && dev.RepDisponibilidadResult.Disponibilidad.CxP.length == 0 
              && dev.RepDisponibilidadResult.Disponibilidad.CxC.length == 0 
              && dev.RepDisponibilidadResult.Disponibilidad.Ord_Pagos.length == 0) {
              swal(
                dev.RepDisponibilidadResult.Error? "ERROR":"INFO",
                msjerror,
                dev.RepDisponibilidadResult.Error? "error":"info")
                .then((value) => {
                  if (value || value == null) {
                  }
                });
            } else {
              this.createArrayOut();
 
            }
          },
          error => {
          })
      }
    } else {
      swal("", "Debe seleccionar una opción válida", "info")
        .then((value) => {
          if (value || value == null) {
          }
        });
    }
  }

  createArrayOut() {
    let rows = new Array < MockDisponibilidadOut > ();

    let Caja = new Formato("", "Total del Cliente :",
      this.getAcumMontoD(this.detalleReportOut.RepDisponibilidadResult.Disponibilidad.Caja),
      this.getAcumMontoH(this.detalleReportOut.RepDisponibilidadResult.Disponibilidad.Caja));
    this.detalleReportOut.RepDisponibilidadResult.Disponibilidad.Caja.unshift(Caja);
    rows.push(new MockDisponibilidadOut("Saldo Caja",
      this.detalleReportOut.RepDisponibilidadResult.Disponibilidad.Caja));

    let Saldo_Banco = new Formato("", "Total del Cliente :",
      this.getAcumMontoD(this.detalleReportOut.RepDisponibilidadResult.Disponibilidad.Banco),
      this.getAcumMontoH(this.detalleReportOut.RepDisponibilidadResult.Disponibilidad.Banco));
    this.detalleReportOut.RepDisponibilidadResult.Disponibilidad.Banco.unshift(Saldo_Banco);
    rows.push(new MockDisponibilidadOut("Saldo Banco",
      this.detalleReportOut.RepDisponibilidadResult.Disponibilidad.Banco));


    let Saldo_CxP = new Formato("", "Total del Cliente :",
      this.getAcumMontoD(this.detalleReportOut.RepDisponibilidadResult.Disponibilidad.CxP),
      this.getAcumMontoH(this.detalleReportOut.RepDisponibilidadResult.Disponibilidad.CxP));
    this.detalleReportOut.RepDisponibilidadResult.Disponibilidad.CxP.unshift(Saldo_CxP);
    rows.push(new MockDisponibilidadOut("Saldo CxP",
      this.detalleReportOut.RepDisponibilidadResult.Disponibilidad.CxP));

    let CxC = new Formato("", "Total del Cliente :",
      this.getAcumMontoD(this.detalleReportOut.RepDisponibilidadResult.Disponibilidad.CxC),
      this.getAcumMontoH(this.detalleReportOut.RepDisponibilidadResult.Disponibilidad.CxC));
    this.detalleReportOut.RepDisponibilidadResult.Disponibilidad.CxC.unshift(CxC);
    rows.push(new MockDisponibilidadOut("Saldo CxC",
      this.detalleReportOut.RepDisponibilidadResult.Disponibilidad.CxC));

    let Order_Pagos = new Formato("", "Total del Cliente :",
      this.getAcumMontoD(this.detalleReportOut.RepDisponibilidadResult.Disponibilidad.Ord_Pagos),
      this.getAcumMontoH(this.detalleReportOut.RepDisponibilidadResult.Disponibilidad.Ord_Pagos));
    this.detalleReportOut.RepDisponibilidadResult.Disponibilidad.Ord_Pagos.unshift(Order_Pagos);
    rows.push(new MockDisponibilidadOut("Saldo ord_pagos",
      this.detalleReportOut.RepDisponibilidadResult.Disponibilidad.Ord_Pagos));
    this.rows = rows;
    this.pdf.pdfDisponibilidad(this.rows);
  }
  getAcumMontoD(arr: Array < any > ): number {
    let montod = 0;
    arr.forEach(element => {
      montod += +element.Monto_D;
    });
    return montod;
  }
  getAcumMontoH(arr: Array < any > ): number {
    let montoh = 0;
    arr.forEach(element => {
      montoh += +element.Monto_H;
    });
    return montoh;
  }
}
export class MockDisponibilidadOut {
  name: String;
  Disponibilidad: Array < any > ;

  constructor(name, disponibilidad) {
    this.name = name;
    this.Disponibilidad = disponibilidad;
  }
}
