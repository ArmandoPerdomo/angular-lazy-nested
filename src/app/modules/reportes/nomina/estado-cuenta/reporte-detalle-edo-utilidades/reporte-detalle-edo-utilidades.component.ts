import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { MonedaConstPipe } from '../../../../../core/pipes/moneda-const.pipe';
import { Globals } from '../../../../../core/services/globals.service';
import { ActivatedRoute } from '@angular/router';
import { RepNomEdoCtaUtilidadesIn } from '../../../../../abstract/DTO/in/reportesNomina/repNomEdoCtaUtilidadesIn';
import { RepNomEdoCtaUtilidadesOut } from '../../../../../abstract/DTO/out/reportesNomina/repNomEdoCtaUtilidades/repNomEdoCtaUtilidadesOut';
import { DetalleConcepto } from '../../../../../abstract/DTO/out/reportesNomina/repNomEdoCtaUtilidades/RepEdoCtaUtilidadesResult/ResumenUtilidades/DetalleConcepto';
import { RepNomEdoCtaUtilidadesService } from '../../../../../core/services/estados_de_cuenta/repNomEdoCtaUtilidades.service';
import { FormControl } from '@angular/forms';
import { PdfEcUtilidadesService } from '../../../../../core/services/exportables/nomina/estado-cuenta/utilidades/pdf-ec-utilidades.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reporte-detalle-edo-utilidades',
  templateUrl: './reporte-detalle-edo-utilidades.component.html',
  styleUrls: ['./reporte-detalle-edo-utilidades.component.css']
})
export class ReporteDetalleEdoUtilidadesComponent implements OnInit, OnDestroy {

  constructor(
    private location: Location, 
    public route: ActivatedRoute,
    public global: Globals,
    public pipe: MonedaConstPipe,
    public repUtil: RepNomEdoCtaUtilidadesService, 
    public pdf: PdfEcUtilidadesService) { }

  //?Title.
  title: String;
  repDev: Subscription;
  //?Loader.
  loading: boolean = false;
  loadingIndicator: boolean = true;

  //?Formato de entrada de datos.
  det: RepNomEdoCtaUtilidadesIn = new RepNomEdoCtaUtilidadesIn();

  //?Listado.
  listOut: RepNomEdoCtaUtilidadesOut;
  enableSummary = true;
  summaryPosition = 'bottom';
  rows: Array < DetalleConcepto > = [];

  //?Index change handler
  selected = new FormControl(0);

  acums: Array < Array <number> > = [];
 
  ngOnInit() {
    //?Inicialización.
    this.title = "Control de utilidades"

    //?Recuperar la información enviada por parámetro.
    this.route.queryParams.subscribe(params => {
      this.det.Tabajador_D = params.employeeF;
      this.det.Tabajador_H = params.employeeU;
      this.det.Concepto_D = params.conceptF;
      this.det.Concepto_H = params.conceptF;
      this.det.Departamento_D = params.dptoF;
      this.det.Departamento_H = params.dptoF;
      this.det.Contrato_D = params.contractF;
      this.det.Contrato_H = params.contractF;
      this.det.DepGenerado_D = params.generatedF;
      this.det.DepGenerado_H = params.generatedF;
      this.det.ContGenerado_D = params.cGeneratedF;
      this.det.ContGenerado_H = params.cGeneratedF;
      this.det.Fecha_D = params.dateF;
      this.det.Fecha_H = params.dateU;
    });
    this.service(this.det);
  }

  /*
   *Regresar a la pantalla anterior.
   */
  goBack() {
    this.location.back();
  }

  service(det: RepNomEdoCtaUtilidadesIn): void {
    this.loading = true;
    this.global.showLoading();
    let msjerror; String;
    this.repDev = this.repUtil.repUtilidades(det).subscribe(res => {
      if (res.RepEdoCtaUtilidadesResult.Error.toString() == "") {
        msjerror = "No hay información para mostrar"
      } else {
        msjerror = res.RepEdoCtaUtilidadesResult.Error.toString();
      }
      this.global.hideLoading();
      if (res.RepEdoCtaUtilidadesResult.Error || res.RepEdoCtaUtilidadesResult.ResumenUtilidades == null || res.RepEdoCtaUtilidadesResult.ResumenUtilidades == []) {

        swal(  
          res.RepEdoCtaUtilidadesResult.Error ? "ERROR": "INFO", 
          msjerror.toString(),
          res.RepEdoCtaUtilidadesResult.Error ?  "error": "info"
          )
          .then((value) => {
            if (value || value == null) {
              this.goBack();
              this.global.hideLoading();

            }
          });
        $(".swal-overlay").css('background-color', 'rgba(0,0,0,0.8)');
      } else {
        this.loadingIndicator = false;
        this.listOut = res;
        this.global.hideLoading();

        this.summary(res);  
      }
    }, error => {});
  }

  summary(res: any) {
    res.RepEdoCtaUtilidadesResult.ResumenUtilidades.forEach(a => {
      let jan= 0, feb= 0, mar= 0, apr= 0, may= 0, jun= 0, jul= 0, aug= 0, sep= 0, oct= 0, nov= 0, dec= 0, tot = 0;
      let row = [];
      a.DetalleConcepto.forEach(b => {
        jan = +jan + +b.Enero;
        feb = +feb + +b.Febrero;
        mar = +mar + +b.Marzo;
        apr = +apr + +b.Abril;
        may = +may + +b.Mayo;
        jun = +jun + +b.Junio;
        jul = +jul + +b.Julio;
        aug = +aug + +b.Agosto;
        sep = +sep + +b.Septiembre;
        oct = +oct + +b.Octubre;
        nov = +nov + +b.Novimbre;
        dec = +dec + +b.Diciembre;
        tot = +tot + +b.Total;
      });
      row.push(jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec, tot);
      this.acums.push(row);
    });
  }

  accept() {
    this.global.showLoading();
    this.pdf.pdfEdoCuentaUtilidades(this.listOut, this.det);
    this.global.hideLoading();
  }
    
  ngOnDestroy(){
    this.global.hideLoading();
    this.repDev.unsubscribe();
  }
}
