import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { RepNomEstCuentaPrestamosIn } from '../../../../../abstract/DTO/in/reportesNomina/repNomEstCuentaPrestamosIn';
import { Globals } from '../../../../../core/services/globals.service';
import { RepEdoCuentaPrestamosService } from '../../../../../core/services/estados_de_cuenta/repEdoCuentaPrestamos.service';
import { RepNomEstCuentaPrestamosOut } from '../../../../../abstract/DTO/out/reportesNomina/repNomEstCuentaPrestamos/repNomEstCuentaPrestamosOut';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { PdfEcPrestamoService } from '../../../../../core/services/exportables/nomina/estado-cuenta/prestamo/pdf-ec-prestamo.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-reporte-detalle-edo-prestamo',
  templateUrl: './reporte-detalle-edo-prestamo.component.html',
  styleUrls: ['./reporte-detalle-edo-prestamo.component.css']
})
export class ReporteDetalleEdoPrestamoComponent implements OnInit, OnDestroy {
  detalleReport : RepNomEstCuentaPrestamosOut;
  detalleReportin : RepNomEstCuentaPrestamosIn;
  selected = new FormControl(0);
  acum = [];
  repDev:Subscription;

  constructor(
    private location: Location,
    public global: Globals,
    public pdf: PdfEcPrestamoService,
    public router: Router, 
    private route: ActivatedRoute, 
    public repNom: RepEdoCuentaPrestamosService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {

      this.detalleReportin = new RepNomEstCuentaPrestamosIn();
      this.detalleReportin.TipoPrestamo = params["type"];
      this.detalleReportin.Tabajador_D = params["employeeF"];
      this.detalleReportin.Tabajador_H = params["employeeU"];
      this.detalleReportin.Contrato_D = params["contractF"];
      this.detalleReportin.Contrato_H = params["contractU"];
      this.detalleReportin.Fecha_D = params["dateF"];;
      this.detalleReportin.Fecha_H = params["dateU"];;
      this.detalleReportin.Frecuencia = params["frequency"];
      this.detalleReportin.Pagados = params["paid"];
      this.detalleReportin.Pagados = params["method"];

    });

    this.metRep(this.detalleReportin);
  }

  goBack() {
    this.location.back();
  }

  metRep(repformin: RepNomEstCuentaPrestamosIn): void {
    this.global.showLoading();
    let msjerror: String;
    this.repDev = this.repNom.repNomPrestamos(repformin).subscribe(dev => {
      if (dev.RepEdoCtaPrestamoResult.Error.toString() == "") {
        msjerror = "No hay información para mostrar"
      } else {
        msjerror = dev.RepEdoCtaPrestamoResult.Error.toString();
      }
        if (dev.RepEdoCtaPrestamoResult.Error || dev.RepEdoCtaPrestamoResult.ResumenPrestaciones.length == 0) {
          swal(
            dev.RepEdoCtaPrestamoResult.Error ? "ERROR": "INFO", 
            msjerror.toString(),
            dev.RepEdoCtaPrestamoResult.Error ?  "error": "info"
            )
            .then((value) => {
              if (value || value == null) {
                this.goBack();
                this.global.hideLoading();
              }
            });
          $(".swal-overlay").css('background-color', 'rgba(0,0,0,0.8)');

        } else {

          this.detalleReport = dev; //

          let abono;
          dev.RepEdoCtaPrestamoResult.ResumenPrestaciones.forEach(i => {
            abono = 0;
           i.DetallePrestamo.forEach(x => {
             if(x.Pagado){
                abono = +abono + +x.ValorCuota
             }
           }); 
           this.acum.push(abono);
          });

          this.global.hideLoading();
        }
      },
      error => {

      }
    );
  }
  crearPdf(rout: RepNomEstCuentaPrestamosOut,rin: RepNomEstCuentaPrestamosIn){
    this.global.showLoading();
    this.pdf.pdfEdoCuentaPrestamo(rout,rin);
    this.global.hideLoading();
  }

  
  ngOnDestroy(){
    this.global.hideLoading();
    this.repDev.unsubscribe();
  }
}
