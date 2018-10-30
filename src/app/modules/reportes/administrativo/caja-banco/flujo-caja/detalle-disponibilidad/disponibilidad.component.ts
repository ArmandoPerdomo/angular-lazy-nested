import { Component, OnInit, ViewChild, HostListener, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { RepAdmDisponibilidadIn } from '../../../../../../abstract/DTO/in/reporteAdmCajaBlanco/repAdmDisponibilidadIn';
import { ActivatedRoute } from '@angular/router';
import { RepAdmDisponibilidadService } from '../../../../../../core/services/caja-blanco/repAdmDisponibilidad.service';
import { Globals } from '../../../../../../core/services/globals.service';
import { RepAdmDisponibilidadOut } from '../../../../../../abstract/DTO/out/reportesAdmCajaBlanco/repAdmDisponibilidad/repAdmDisponibilidadOut';
import { Formato } from '../../../../../../abstract/DTO/out/reportesAdmCajaBlanco/repAdmDisponibilidad/Disponibilidad/Formato';
import { PdfDisponibilidadCajaService } from '../../../../../../core/services/exportables/administrativo/caja-banco/disponibilidad-caja/pdf-disponibilidad-caja.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-disponibilidad',
  templateUrl: './disponibilidad.component.html',
  styleUrls: ['./disponibilidad.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DisponibilidadComponent implements OnInit, OnDestroy {
  @ViewChild('myTable') table: any;
  detalleReportOut: RepAdmDisponibilidadOut;
  repDev: Subscription;
  rows: Array < MockDisponibilidadOut > ;
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private disponibilidadService: RepAdmDisponibilidadService,
    private global: Globals,
    private pdf: PdfDisponibilidadCajaService) {
    
  }

  ngOnInit() {
    let detalleReportin: RepAdmDisponibilidadIn;
    this.route.queryParams.subscribe(params => { 
      detalleReportin = new RepAdmDisponibilidadIn();

      detalleReportin.Fec_emis = params['date'];
      detalleReportin.Tasa = params['numero'];
      this.metRep(detalleReportin);
    });
  }
  
  goBack(): void {
    this.location.back();
  }

  createPdf(dout: any) {
    this.global.showLoading();
    this.pdf.pdfDisponibilidad(dout);
    this.global.hideLoading()
  }

  metRep(repformin: RepAdmDisponibilidadIn): void {
    $('section').css('visibility', 'hidden');
    this.global.showLoading();
    var msjerror: string = "";
    this.repDev = this.disponibilidadService.repDis(repformin).subscribe((dev: RepAdmDisponibilidadOut) => {
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
              this.goBack();
              this.global.hideLoading();
            }
          });
        } else {
          $('section').css('visibility', 'visible');
          this.detalleReportOut = dev;
          this.createArrayOut();

          this.global.hideLoading();
        }

      },
      error => {
      }
    );
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
  }
  toggleExpandGroup(group) {
    this.table.groupHeader.toggleExpandGroup(group);
  }

  onDetailToggle(event) {
  }
  
  getGroupRowHeight(group, rowHeight) {
    let style = {};

    style = {
      height: (group.length * 40) + 'px',
      width: '100%'
    };

    return style;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    event.target.innerWidth;
    //this.tablawidth();
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

  ngOnDestroy(){
    this.global.hideLoading();
    this.repDev.unsubscribe();
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
