import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RepAdmPagoxNumeroIn } from '../../../../../abstract/DTO/in/reporteAdmCompras/repAdmPagoxNumeroIn';
import { RepAdmPagoxNumeroOut } from '../../../../../abstract/DTO/out/reportesAdmCompras/repAdmPagoxNumero/repAdmPagoxNumeroOut';
import { RepAdmPagoxNumeroService } from '../../../../../core/services/compras/repAdmPagoxNumero.service';
import { FormControlService } from '../../../../../core/services/form-control.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Globals } from '../../../../../core/services/globals.service';
import { PdfPagoNumeroService } from '../../../../../core/services/exportables/administrativo/compras/pago-numero/pdf-pago-numero.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detalle-pagos',
  templateUrl: './reporte-detalles-pagos-por-numero.component.html',
  styleUrls: ['./reporte-detalles-pagos-por-numero.component.css']
})
export class ReporteDetallesPagosPorNumeroComponent implements OnInit , OnDestroy{
  titListadoPagos: string;
  listaOut: RepAdmPagoxNumeroOut;
  ListadoPagosPdf: FormGroup;
  @ViewChild('myTable') table: any;
  loading = false;
  // Elementos para el datatable

  rows = [];
  loadingIndicator: boolean = true;
  detalleReportout: RepAdmPagoxNumeroOut;
  repDev : Subscription;
  detalleReportin: RepAdmPagoxNumeroIn;
  env = 'PDF';
  acum: number;

  constructor(
    private location: Location,
    private repAdm: RepAdmPagoxNumeroService,
    private route: ActivatedRoute,
    private pdf: PdfPagoNumeroService,
    public formService: FormControlService,
    public global: Globals) {
  }

  goBack() {
    this.location.back();
  }

  ngOnInit() {
    this.ListadoPagosPdf = new FormGroup({
      enviar: new FormControl('PDF')
    });

    this.route.queryParams.subscribe(params => {
      let numeroD = parseInt(params['numD']);
      let numeroh = parseInt(params['numH']);
      let fechaD = params['dateD'];
      let fechah = params['dateH'];
      let provD = params['proveedorD'];
      let provh = params['proveedorH'];
      let moneda = params['moneda'];
      let segD = params['segmentoD'];
      let segh = params['segmentoH'];
      let zonaD = params['segmentoD'];
      let zonah = params['segmentoD'];

      this.detalleReportin = new RepAdmPagoxNumeroIn();
      this.detalleReportin.NumeroD = numeroD;
      this.detalleReportin.Numeroh = numeroh;
      this.detalleReportin.FechaD = fechaD;
      this.detalleReportin.Fechah = fechah;
      this.detalleReportin.Co_ProvD = provD;
      this.detalleReportin.Co_Provh = provh;
      this.detalleReportin.Moneda = moneda;
      this.detalleReportin.Co_SegmentoD = segD;
      this.detalleReportin.Co_Segmentoh = segh;
      this.detalleReportin.Co_ZonaD = zonaD;
      this.detalleReportin.Co_Zonah = zonah;
    });
    this.mepost(this.detalleReportin);
    this.titListadoPagos = 'Pago por número';
    this.acum = 0.00;
    this.env = 'PDF';
  }

  mepost(repformin: RepAdmPagoxNumeroIn): void {
    $('section').css('visibility', 'hidden');
    this.global.showLoading();
    var msjerror: string = "";
    this.loading = true;
    this.repDev = this.repAdm.repCxP(repformin).subscribe(cli => {
      if(cli.RepPagoxNumeroResult.Error.toString()==""){
        msjerror = "No hay información para mostrar"
      }else{
        msjerror =cli.RepPagoxNumeroResult.Error.toString();
      }

      if(cli.RepPagoxNumeroResult.Error || cli.RepPagoxNumeroResult.PagosXNumero.length==0){

        swal(
        cli.RepPagoxNumeroResult.Error? "ERROR":"INFO",
        msjerror,
        cli.RepPagoxNumeroResult.Error? "error":"info")
        .then((value) => {
          if (value || value==null) {
            this.global.hideLoading();
          }
        });
  }else{
        cli.RepPagoxNumeroResult.PagosXNumero.forEach(x => {
          this.acum = +this.acum + +x.Monto;
        });
        $('section').css('visibility', 'visible');
        this.detalleReportout = cli;
        this.rows = this.detalleReportout.RepPagoxNumeroResult.PagosXNumero;
        setTimeout(() => {
          this.loadingIndicator = false;
          this.global.hideLoading();
        }, 1500);
      }
      this.loading = false;
      },
      error => {
      });
  }

  public createPdf(dout: RepAdmPagoxNumeroOut, din: RepAdmPagoxNumeroIn) {
    this.global.showLoading();
    if (this.ListadoPagosPdf.value["enviar"] == "PDF") {
      this.pdf.pdfPagoXNumero(dout, din);
      this.global.hideLoading();
    }
  }
  ngOnDestroy(){
    this.global.hideLoading();
    this.repDev.unsubscribe();
  }

}
