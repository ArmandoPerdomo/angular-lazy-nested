import { Component, OnInit, OnDestroy} from '@angular/core';
import { Location} from '@angular/common';
import { RepNomEstCuentaPrestacionesOut} from '../../../../../abstract/DTO/out/reportesNomina/repNomEstCuentaPrestaciones/repNomEstCuentaPrestacionesOut';
import { RepEdoCuentaPrestacionesService} from '../../../../../core/services/estados_de_cuenta/repEdoCuentaPrestaciones.service';
import { ActivatedRoute} from '@angular/router';
import { RepNomEstCuentaPrestacionesIn} from '../../../../../abstract/DTO/in/reportesNomina/repNomEstCuentaPrestacionesIn';
import { Router} from '@angular/router';
import { FormGroup,  FormControl} from '@angular/forms';
import { Globals} from '../../../../../core/services/globals.service';
import { Observable, Subscription} from 'rxjs';
import { ListaTrabajadoresService} from '../../../../../core/services/listas/lista-trabajadores.service';
import { Prestaciones} from '../../../../../abstract/DTO/out/reportesNomina/repNomEstCuentaPrestaciones/RepEstadoCuentasPrestacionesResult/Prestaciones/Prestaciones';
import { PdfEcPrestacionesService} from '../../../../../core/services/exportables/nomina/estado-cuenta/prestaciones/pdf-ec-prestaciones.service';

@Component({
  selector: 'app-reporte-detalle-edo-prestaciones',
  templateUrl: './reporte-detalle-edo-prestaciones.component.html',
  styleUrls: ['./reporte-detalle-edo-prestaciones.component.css']
})
export class ReporteDetalleEdoPrestacionesComponent implements OnInit, OnDestroy {
  titListadoPagos: string;
  env = '';
  detalleReport: RepNomEstCuentaPrestacionesOut;
  ListadoPDFEdoPrestaciones: FormGroup;
  detalleReportin: RepNomEstCuentaPrestacionesIn;
  repDev: Subscription

  //? Variales para combo
  trabajadoresCallback: Observable < any > ;

  //! NgModel
  TrabajadorD: String;
  itemPres: Prestaciones = new Prestaciones();

  constructor(
    private location: Location, 
    private repNom: RepEdoCuentaPrestacionesService, 
    public listaT: ListaTrabajadoresService,
    private route: ActivatedRoute, 
    private pdf: PdfEcPrestacionesService,
    public router: Router, 
    public global: Globals) {

     
      this.titListadoPagos = 'Estados de cuenta prestaciones';

  }

  ngOnInit() {
    this.env = '';

    this.route.queryParams.subscribe(params => {
      let fechaD = params['dateD'];
      let fechaH = params['dateH'];
      let TraD = params['trabajadorD'];
      let TraH = params['trabajadorH'];

      this.detalleReportin = new RepNomEstCuentaPrestacionesIn();
      this.detalleReportin.Fecha_D = fechaD
      this.detalleReportin.Fecha_h = fechaH
      this.detalleReportin.Tabajador_D = TraD
      this.detalleReportin.Tabajador_H = TraH

    });
    this.metRep(this.detalleReportin);

    this.ListadoPDFEdoPrestaciones = new FormGroup({
      enviar: new FormControl(''),
      trabajadorD: new FormControl('')
    });
  }


  goBack() {
    this.location.back();
  }

  arrayregistro = [];

  metRep(repformin: RepNomEstCuentaPrestacionesIn): void {

    $('section').css('visibility', 'hidden');
    this.global.showLoading();

    let msjerror; 
    this.repDev = this.repNom.repNomPrestaciones(repformin).subscribe(dev => {
      if (dev.RepEstadoCuentasPrestacionesResult.Error.toString() == "") {
        msjerror = "No hay información para mostrar"
      } else {
        msjerror = dev.RepEstadoCuentasPrestacionesResult.Error.toString();
      }

        this.global.hideLoading();
        if (dev.RepEstadoCuentasPrestacionesResult.Prestaciones.length == 0 || dev.RepEstadoCuentasPrestacionesResult.Error) {
          swal(
          dev.RepEstadoCuentasPrestacionesResult.Error ? "ERROR": "INFO", 
          msjerror.toString(),
          dev.RepEstadoCuentasPrestacionesResult.Error ?  "error": "info"
          )
            .then((value) => {
              if (value || value == null) {
                this.goBack();
              }
            });
          $(".swal-overlay").css('background-color', 'rgba(0,0,0,0.8)');

        } else {


          this.detalleReport = dev; //
          $('section').css('visibility', 'visible');
          this.global.showLoading();
          this.trabajadoresCallback = this.listaT.rangoTrabajadoresEdoCuentasPrestaciones(this.detalleReport.RepEstadoCuentasPrestacionesResult);


          dev.RepEstadoCuentasPrestacionesResult.Prestaciones.forEach(i => {
            this.arrayregistro = i.Registro;
          });

          this.global.hideLoading();
        }
      },
      error => {


      }
    );
  }


crearPdf(rout:RepNomEstCuentaPrestacionesOut, din:RepNomEstCuentaPrestacionesIn ) {
  this.global.showLoading();
  this.pdf.pdfEdoCuentaPrestaciones(rout, din);
  this.global.hideLoading();
}

  changeTrabajadorCodigo(codigo: String) {
    this.TrabajadorD = codigo;
    let item = this.detalleReport.RepEstadoCuentasPrestacionesResult.Prestaciones.filter((term) => term.Co_Empleado.includes(codigo.toString()))
    this.itemPres = item[0];
  }

  ngOnDestroy(){
    this.global.hideLoading();
    this.repDev.unsubscribe();
  }



}
