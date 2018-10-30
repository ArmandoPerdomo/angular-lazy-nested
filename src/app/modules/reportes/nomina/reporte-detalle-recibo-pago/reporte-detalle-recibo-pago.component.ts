import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  Location
} from '@angular/common';
import {
  RepNomReciboPagoOut
} from '../../../../abstract/DTO/out/reportesNomina/repNomReciboPago/repNomReciboPagoOut';
import {
  RepNomReciboPagoIn
} from '../../../../abstract/DTO/in/reportesNomina/repNomReciboPagoIn';
import {
  ActivatedRoute
} from '@angular/router';
import {
  Globals
} from '../../../../core/services/globals.service';
import {
  RepNomReciboPagoService
} from '../../../../core/services/estados_de_cuenta/repNomReciboPago.service';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import {
  Observable,
  of,
  Subscription
} from 'rxjs';
import {
  ListaTipo1Out
} from '../../../../abstract/DTO/out/listaTipo1/listaTipo1Out';
import {
  Lista
} from '../../../../abstract/DTO/out/listaTipo1/lista';
import {
  Recibos
} from '../../../../abstract/DTO/out/reportesNomina/repNomReciboPago/RepReciboPagoResult/Recibos/Recibos';
import {
  pdfReciboNominaService
} from '../../../../core/services/exportables/nomina/recibo/pdf-recibo-nomina.service';

@Component({
  selector: 'app-reporte-detalle-recibo-pago',
  templateUrl: './reporte-detalle-recibo-pago.component.html',
  styleUrls: ['./reporte-detalle-recibo-pago.component.css']
})
export class ReporteDetalleReciboPagoComponent implements OnInit, OnDestroy {
  detalleReport: RepNomReciboPagoOut;
  detalleReportin: RepNomReciboPagoIn;
  neto: Number;
  acumneto: Number;
  acumasig: Number;
  acumde: Number;
  registro: Boolean = false;
  repDev : Subscription;

  //? Models
  rcbo: String;
  itemRcbo: Recibos = new Recibos();

  //? Variable del combo
  reciboCallBack: Observable < any > ;

  detalle: FormGroup;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    public global: Globals,
    public pdf: pdfReciboNominaService,
    public repNom: RepNomReciboPagoService) {}

  ngOnInit() {

    this.detalle = new FormGroup({
      recibo: new FormControl('', [Validators.required])
    });

    this.route.queryParams.subscribe(params => {
      this.detalleReportin = new RepNomReciboPagoIn();
      this.detalleReportin.Recibo_D = params['reciboD'];
      this.detalleReportin.Recibo_H = params['reciboH'];
      this.detalleReportin.Fecha_D = params['fechaD'];
      this.detalleReportin.Fecha_H = params['fechaH'];;
      this.detalleReportin.Tabajador_D = params['trabajador'];
      this.detalleReportin.Tabajador_H = params['trabajador'];
    });

    this.metRep(this.detalleReportin);
    this.acumasig = 0;
    this.acumde = 0;
    this.acumneto = 0;
  }


  metRep(repformin: RepNomReciboPagoIn): void {
    this.global.showLoading();
    $('section').css('visibility', 'hidden');
    var msjerror: string = "";

   this.repDev =  this.repNom.repNomReciboPago(repformin).subscribe(dev => {
        if (dev.RepReciboPagoResult.Error.toString() == "") {
          msjerror = "No hay información para mostrar"
        } else {
          msjerror = dev.RepReciboPagoResult.Error.toString();
        }

        if (dev.RepReciboPagoResult.Error || dev.RepReciboPagoResult.Recibos.length == 0 || dev.RepReciboPagoResult.Recibos == null) { 
          swal(
          dev.RepReciboPagoResult.Error ? "ERROR": "INFO", 
          msjerror,
          dev.RepReciboPagoResult.Error ?  "error": "info"
          )
            .then((value) => {
              if (value || value == null) {
                this.goBack();
                this.global.hideLoading();

              }
            });
        } else {
          $('section').css('visibility', 'visible');
          this.detalleReport = dev;

          this.global.hideLoading();

          this.reciboCallBack = this.listaRecibo(dev.RepReciboPagoResult.Recibos);


        }

      },
      error => {

      }
    );

  }

  getMockListaRecibo(rout: any) {
    let lista: ListaTipo1Out = new ListaTipo1Out();
    rout.forEach(el => {
      lista.Lista.push(new Lista(el.N_Recibo.toString(), el.N_Recibo.toString()));
    });
    lista.sMensajeError = null;
    return lista;
  }

  listaRecibo(rout: any): Observable < ListaTipo1Out > {
    let items = this.getMockListaRecibo(rout);
    return of(items);
  }

  changeReciboCodigo(codigo: String) {
    this.rcbo = codigo;
    this.registro = true;
    this.acumasig = 0;
    this.acumde = 0;
    let item = this.detalleReport.RepReciboPagoResult.Recibos.filter((term) => term.N_Recibo.toString().includes(codigo.toString()))
    this.itemRcbo = item[0];
    this.itemRcbo.Registro.forEach(el => {
      this.acumasig = +this.acumasig + +el.Asignaciones;
      this.acumde = +this.acumde + +el.Deducciones;

    })
    this.acumneto = +this.acumasig - +this.acumde;
  }

  createPdf() {
    let repformin: RepNomReciboPagoIn
    repformin = new RepNomReciboPagoIn();
    if (this.detalle.valid) {
      this.route.queryParams.subscribe(params => {
        repformin.Recibo_D = this.detalle.value['recibo'];
        repformin.Recibo_H = this.detalle.value['recibo'];
        repformin.Fecha_D = params['fechaD'];
        repformin.Fecha_H = params['fechaH'];;
        repformin.Tabajador_D = params['trabajador'];
        repformin.Tabajador_H = params['trabajador'];
      });
      this.repNom.repNomReciboPago(repformin).subscribe(dev => {
        let rout: RepNomReciboPagoOut
        rout = dev
        this.global.showLoading();
        this.pdf.pdfReciboNomina(rout);
        this.global.hideLoading();
      });
    }else{
      swal("", "Debe seleccionar un número de recibo", "info")
        .then((value) => {
          if (value || value == null) {

          }
        });
    
    }


  }
  
  goBack() {
    this.location.back();
  }

  ngOnDestroy(){
    this.global.hideLoading();
    this.repDev.unsubscribe();
  }
}
