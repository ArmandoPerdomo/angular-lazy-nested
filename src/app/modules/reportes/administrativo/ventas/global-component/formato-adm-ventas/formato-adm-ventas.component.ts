import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RepAdmFacturaResumenCompletoOut } from '../../../../../../abstract/DTO/out/reportesAdmVentas/repAdmFacturaResumenCompleto/repAdmFacturaResumenCompleto';
import { RepAdmFacturaResumenCompletoService } from '../../../../../../core/services/ventas/repAdmFacturaResumenCompleto.service';
import { ListarClienteOut } from '../../../../../../abstract/DTO/out/listaClientes/listarClientesOut';
import { Router } from '@angular/router';
import { RepAdmFormatosIn } from '../../../../../../abstract/DTO/in/reportes/repAdmFormatosIn';
import { ListaDocumentosService } from '../../../../../../core/services/listas/lista-documentos.service';
import { ListaDocumentosIn } from '../../../../../../abstract/DTO/in/listaDocumentosIn';
import { ListaDocumentosOut } from '../../../../../../abstract/DTO/out/listaDocumentos/listaDocumentosOut';
import { RepAdmFormatosService } from '../../../../../../core/services/reportes/repAdmFormatos.service';
import { RepAdmFormatosOut } from '../../../../../../abstract/DTO/out/reportes/repAdmFormatos/repAdmFormatos';
import { FormatoAdmVentas } from '../../../../../../abstract/DTO/formatoadmventas';
import { FormControlService } from '../../../../../../core/services/form-control.service';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap, map } from 'rxjs/operators'
import { RepAdmFormatosCobPagOut } from '../../../../../../abstract/DTO/out/reportes/repAdmFormatosCobPag/repAdmFormatosCobPag';
import { RepAdmFormatosCobPagIn } from '../../../../../../abstract/DTO/in/reportes/repAdmFormatosCobPagIn.';
import { RepAdmFormatosCobPagService } from '../../../../../../core/services/reportes/repAdmFormatosCobPag.service';
import { ListarClientesIn } from '../../../../../../abstract/DTO/in/listarClientesIn';
import { ListaClienteService } from '../../../../../../core/services/listas/listar-clientes.service';
import { RepAdmFacturaResumenCompletoIn } from '../../../../../../abstract/DTO/in/reportesAdmVentas/repAdmFacturaResumenCompleto';
import { Globals } from '../../../../../../core/services/globals.service';
import { PdfFacturaDigitalService } from '../../../../../../core/services/exportables/administrativo/ventas/facturas-digital/pdf-factura-digital.service';
import { PdfResumenFacturaService } from '../../../../../../core/services/exportables/administrativo/ventas/resumen-factura/pdf-resumen-factura.service';
import { PdfCobroDigitalService } from '../../../../../../core/services/exportables/administrativo/ventas/cobro-digital/pdf-cobro-digital.service';
import { PdfNotaEntregaService } from '../../../../../../core/services/exportables/administrativo/ventas/nota-entrega/pdf-nota-entrega.service';
import { PdfNotaDespachoService } from '../../../../../../core/services/exportables/administrativo/ventas/nota-despacho/pdf-nota-despacho.service';
import { PdfCotizacionDigitalService } from '../../../../../../core/services/exportables/administrativo/ventas/cotizacion-digital/pdf-cotizacion-digital.service';
import { PdfDevolucionDigitalService } from '../../../../../../core/services/exportables/administrativo/ventas/devolucion-digital/pdf-devolucion-digital.service';
import { PdfPedidoDigitalService } from '../../../../../../core/services/exportables/administrativo/ventas/pedido-digital/pdf-pedido-digital.service';
import { PdfPlantillaVentaService } from '../../../../../../core/services/exportables/administrativo/ventas/plantilla-venta/pdf-plantilla-venta.service';

@Component({
  selector: 'formato-adm-ventas',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './formato-adm-ventas.component.html',
  styleUrls: ['./formato-adm-ventas.component.css']
})
export class FormatoAdmVentasComponent implements OnInit {
  clientes$: Observable<ListarClienteOut>;
  listaDocOut: ListaDocumentosOut;
  clienteLoading: boolean = false;
  clienteBuffer = [];
  bufferSize = 20;
  input$ = new Subject<string>();
  registro: Boolean = false;
  // parametros para validaciones en el formulario
  sCodigo: String;
  sDescripcion: String;
  GeneralesVentas: FormGroup;
  num = 0;
  clien = [];
  env = "";
  listaCliente: ListarClienteOut;
  repadminfacturaresumencompleto: RepAdmFacturaResumenCompletoOut;
  @Input() formatoadmventas: FormatoAdmVentas;



  constructor(
    public listaC: ListaClienteService,
    private listaDoc: ListaDocumentosService,
    public repadmfactcompleto: RepAdmFacturaResumenCompletoService,
    public router: Router,
    private repAdm: RepAdmFormatosService,
    private repAdmCobro: RepAdmFormatosCobPagService,
    public global: Globals,
    public pdfFD: PdfFacturaDigitalService,
    public pdfRF: PdfResumenFacturaService,
    public pdfCD: PdfCobroDigitalService,
    public pdfNE: PdfNotaEntregaService,
    public pdfND: PdfNotaDespachoService,
    public pdfCot: PdfCotizacionDigitalService,
    public pdfDD: PdfDevolucionDigitalService,
    public pdfPD: PdfPedidoDigitalService,
    public pdfPV: PdfPlantillaVentaService,
    public formService: FormControlService) {}

  limpiar() {
    this.num = 0;
    this.clien = [];
    this.env = "";
    this.listaDocOut = null;
    this.clienteLoading=false;
  }

  //? Evento para el padre
  receiveNum($event) {
    this.num = $event
  }

  //? Evento doble click
  receiveAccept(){
    this.GeneralesVentas.controls["enviar"].setValue("Listado");
    this.Aceptar();
  }

  ngOnInit() {
     //? metodo para validar campos
     this.GeneralesVentas = new FormGroup ({
      numero: new FormControl('', [Validators.required]),
      cliente: new FormControl(''),
      enviar: new FormControl('', [Validators.required]),
      type: new FormControl(this.formatoadmventas.type),
      titulo: new FormControl(this.formatoadmventas.titulo),
      titulo_detalle: new FormControl(this.formatoadmventas.titulo_detalle)
    });
    this.mepost();
    this.onSearch();
  }

  fetchMore(term) {
    const len = this.clienteBuffer.length;
    let more;
    if (term != null)
      more = this.listaCliente.Lista.filter(x => x.sCodigo.includes(term) || x.sDescripcion.includes(term)).slice(len, this.bufferSize + len);
    else
      more = this.listaCliente.Lista.slice(len, this.bufferSize + len);

    this.clienteLoading = true;
    setTimeout(() => {
        this.clienteLoading = false;
        this.clienteBuffer = this.clienteBuffer.concat(more);
    }, 300)
  }
  
  Aceptar() {
    //* validando Formulario
     this.formService.markFormGroupTouched(this.GeneralesVentas);
    if (this.GeneralesVentas.valid){
      if (this.GeneralesVentas.value["numero"] == 0){
        swal("","Debe indicar un número válido o un cliente para buscar","info")
        .then((value) => {
          if (value || value==null) {

          }
        });
      }else if (this.GeneralesVentas.value["enviar"] == "Listado"){
        switch(this.formatoadmventas.type){
          case "COBRO":
            this.router.navigate([`${this.router.url}/detalle`], { queryParams: this.GeneralesVentas.value });
          break;
          case "RESUMENFACT":
            this.router.navigate([`${this.router.url}/detalle`], { queryParams: this.GeneralesVentas.value });
          break;
          default:
            this.router.navigate([`${this.router.url}/detalle`], { queryParams: this.GeneralesVentas.value });
          break;
        }
      }else if (this.GeneralesVentas.value["enviar"] == "PDF"){
          this.createPdf();
      }
    }else{
        swal("","Debe seleccionar una opción válida","info")
        .then((value) => {
          if (value || value==null) { 
          }
        }); 
    }
  }


  /*
   *Regresar a la pantalla anterior.
   */
  goBack(): void {
    this.router.navigate([`app/reportes/dashboard`]);
  }

  cargarListaDevClientes(){
    let listadocin: ListaDocumentosIn = new ListaDocumentosIn();
    listadocin.sCodigo_Cliente_D = this.GeneralesVentas.value["cliente"];
    listadocin.sCodigo_Cliente_H= this.GeneralesVentas.value["cliente"];
    listadocin.sTipoDoc = this.formatoadmventas.stipodoc;
    this.listaDoc.listaDev(listadocin).subscribe(cli => {
        this.listaDocOut = cli;
        if (cli.Lista.length == 0) {
          this.registro = false;
        } else {
          this.registro = true;
        }
    },error => {});
  }

  //* Método que hace llamado al servicio
  mepost(): void {
    let listaCli: ListarClientesIn = new ListarClientesIn();
    this.clienteLoading=true;
    this.listaC.asCli(listaCli).subscribe( cli => {
    this.listaCliente = cli;
    this.clienteLoading=false;
    this.clienteBuffer = this.listaCliente.Lista.slice(0, this.bufferSize);
    },
    error => {

    });
  }

  createPdf() {
    this.global.showLoading();
    if (this.formatoadmventas.type == "COBRO") {
      let detalleReportOut: RepAdmFormatosCobPagOut;
      let detalleReportin: RepAdmFormatosCobPagIn;
      detalleReportin = new RepAdmFormatosCobPagIn();
      detalleReportin.Numero = this.GeneralesVentas.value["numero"];
      detalleReportin.Documento = this.GeneralesVentas.value["type"];
      this.repAdmCobro.repDev(detalleReportin).subscribe(dev => {
          detalleReportOut = dev;
          if (dev.FormatosCobPagResult.Error || dev.FormatosCobPagResult.DocumentosAsociados == null && dev.FormatosCobPagResult.Encabezado == null) {
              swal(
                dev.FormatosCobPagResult.Error? "ERROR": "INFO",
                dev.FormatosCobPagResult.Error?dev.FormatosCobPagResult.Error.toString(): "Debe tipear un número válido",
                dev.FormatosCobPagResult.Error? "error": "info")
              .then((value) => {
                if (value || value == null) {
                  this.global.hideLoading();
                }
              });
          } else {
            this.pdfCD.pdfCobro(detalleReportOut);
            this.global.hideLoading();
          }
        },
        error => {});
    } else if (this.formatoadmventas.type == "RESUMENFACT") {
      let detalleReportOut: RepAdmFacturaResumenCompletoOut;
      let detalleReportin: RepAdmFacturaResumenCompletoIn = new RepAdmFacturaResumenCompletoIn();
      detalleReportin = new RepAdmFacturaResumenCompletoIn();
      detalleReportin.Numero_d = this.GeneralesVentas.value["numero"];
      detalleReportin.Numero_h = this.GeneralesVentas.value["numero"];
      this.repadmfactcompleto.listFacturaAdmin(detalleReportin).subscribe(dev => {
          detalleReportOut = dev;
          if ( dev.ReporteFacturaResumenCompletoResult.Error || dev.ReporteFacturaResumenCompletoResult.ResumenFacturas.length == 0) {
            swal(
              dev.ReporteFacturaResumenCompletoResult.Error? "ERROR": "INFO",
              dev.ReporteFacturaResumenCompletoResult.Error?dev.ReporteFacturaResumenCompletoResult.Error.toString(): "Debe tipear un número válido",
              dev.ReporteFacturaResumenCompletoResult.Error? "error": "info")
              .then((value) => {
                if (value || value == null) {
                  this.global.hideLoading();
                }
              });

          } else {
            this.pdfRF.pdfResumenFactura(detalleReportOut);
            this.global.hideLoading();
          }
        },
        error => {});

    } else if (this.formatoadmventas.type == "FAC") {
      let detalleReportOut: RepAdmFormatosOut;
      let detalleReportin: RepAdmFormatosIn = new RepAdmFormatosIn();
      detalleReportin = new RepAdmFormatosIn();
      detalleReportin.Numero = this.GeneralesVentas.value["numero"];
      detalleReportin.Documento = this.GeneralesVentas.value["type"];
      this.global.showLoading();
      this.repAdm.repDev(detalleReportin).subscribe(dev => {
          detalleReportOut = dev;
          if (dev.FormatosResult.Error || dev.FormatosResult.Encabezado == null && dev.FormatosResult.Renglones == null) {
            swal(
              dev.FormatosResult.Error? "ERROR": "INFO",
              dev.FormatosResult.Error?dev.FormatosResult.Error.toString(): "Debe tipear un número válido",
              dev.FormatosResult.Error? "error": "info")
              .then((value) => {
                if (value || value == null) {
                  this.global.hideLoading();
                }
              });

          } else {
            this.pdfFD.pdfFacDig(detalleReportOut);
            this.global.hideLoading();
          }
        },
        error => {});
    } else if (this.formatoadmventas.type == "NOTA_E") {
      let detalleReportOut: RepAdmFormatosOut;
      let detalleReportin: RepAdmFormatosIn = new RepAdmFormatosIn();
      detalleReportin = new RepAdmFormatosIn();
      detalleReportin.Numero = this.GeneralesVentas.value["numero"];
      detalleReportin.Documento = this.GeneralesVentas.value["type"];
      this.repAdm.repDev(detalleReportin).subscribe(dev => {
          detalleReportOut = dev;
          if (dev.FormatosResult.Error || dev.FormatosResult.Encabezado == null && dev.FormatosResult.Renglones == null) {
            swal(
              dev.FormatosResult.Error? "ERROR": "INFO",
              dev.FormatosResult.Error?dev.FormatosResult.Error.toString(): "Debe tipear un número válido",
              dev.FormatosResult.Error? "error": "info")
              .then((value) => {
                if (value || value == null) {
                  this.global.hideLoading();
                }
              });

          } else {
            this.pdfNE.pdfNotaEn(detalleReportOut);
            this.global.hideLoading();
          }
        },
        error => {});
    } else if (this.formatoadmventas.type == "NOTA_D") {
      let detalleReportOut: RepAdmFormatosOut;
      let detalleReportin: RepAdmFormatosIn = new RepAdmFormatosIn();
      detalleReportin = new RepAdmFormatosIn();
      detalleReportin.Numero = this.GeneralesVentas.value["numero"];
      detalleReportin.Documento = this.GeneralesVentas.value["type"];
      this.repAdm.repDev(detalleReportin).subscribe(dev => {
          detalleReportOut = dev;
          if (dev.FormatosResult.Error || dev.FormatosResult.Encabezado == null && dev.FormatosResult.Renglones == null) {
            swal(
              dev.FormatosResult.Error? "ERROR": "INFO",
              dev.FormatosResult.Error?dev.FormatosResult.Error.toString(): "Debe tipear un número válido",
              dev.FormatosResult.Error? "error": "info")
              .then((value) => {
                if (value || value == null) {
                  this.global.hideLoading();
                }
              });

          } else {
            this.pdfND.pdfNotaDe(detalleReportOut);
            this.global.hideLoading();
          }
        },
        error => {});
    } else if (this.formatoadmventas.type == "COTIZ_C") {
      let detalleReportOut: RepAdmFormatosOut;
      let detalleReportin: RepAdmFormatosIn = new RepAdmFormatosIn();
      detalleReportin = new RepAdmFormatosIn();
      detalleReportin.Numero = this.GeneralesVentas.value["numero"];
      detalleReportin.Documento = this.GeneralesVentas.value["type"];
      this.repAdm.repDev(detalleReportin).subscribe(dev => {
          detalleReportOut = dev;
          if (dev.FormatosResult.Error || dev.FormatosResult.Encabezado == null && dev.FormatosResult.Renglones == null) {
            swal(
              dev.FormatosResult.Error? "ERROR": "INFO",
              dev.FormatosResult.Error?dev.FormatosResult.Error.toString(): "Debe tipear un número válido",
              dev.FormatosResult.Error? "error": "info")
              .then((value) => {
                if (value || value == null) {
                  this.global.hideLoading();
                }
              });
          } else {
            this.pdfCot.pdfCotizacion(detalleReportOut);
            this.global.hideLoading();
          }
        },
        error => {});
    } else if (this.formatoadmventas.type == "DEV_CLI") {
      let detalleReportOut: RepAdmFormatosOut;
      let detalleReportin: RepAdmFormatosIn = new RepAdmFormatosIn();
      detalleReportin = new RepAdmFormatosIn();
      detalleReportin.Numero = this.GeneralesVentas.value["numero"];
      detalleReportin.Documento = this.GeneralesVentas.value["type"];
      this.repAdm.repDev(detalleReportin).subscribe(dev => {
          detalleReportOut = dev;
          if (dev.FormatosResult.Error || dev.FormatosResult.Encabezado == null && dev.FormatosResult.Renglones == null) {
            swal(
              dev.FormatosResult.Error? "ERROR": "INFO",
              dev.FormatosResult.Error?dev.FormatosResult.Error.toString(): "Debe tipear un número válido",
              dev.FormatosResult.Error? "error": "info")
              .then((value) => {
                if (value || value == null) {
                  this.global.hideLoading();
                }
              });
          } else {
            this.pdfDD.pdfDevolucion(detalleReportOut);
            this.global.hideLoading();
          }
        },
        error => {});
    } else if (this.formatoadmventas.type == 'PEDIDO') {
      let detalleReportOut: RepAdmFormatosOut;
      let detalleReportin: RepAdmFormatosIn = new RepAdmFormatosIn();
      detalleReportin = new RepAdmFormatosIn();
      detalleReportin.Numero = this.GeneralesVentas.value["numero"];
      detalleReportin.Documento = this.GeneralesVentas.value["type"];
      this.repAdm.repDev(detalleReportin).subscribe(dev => {
          detalleReportOut = dev;

          if (dev.FormatosResult.Error || dev.FormatosResult.Encabezado == null && dev.FormatosResult.Renglones == null) {
            swal(
              dev.FormatosResult.Error? "ERROR": "INFO",
              dev.FormatosResult.Error?dev.FormatosResult.Error.toString(): "Debe tipear un número válido",
              dev.FormatosResult.Error? "error": "info")
              .then((value) => {
                if (value || value == null) {
                  this.global.hideLoading();
                }
              });
          } else {
            this.pdfPD.pdfPedido(detalleReportOut);
            this.global.hideLoading();
          }
        },
        error => {});
    } else if (this.formatoadmventas.type == 'PLAVENT') {
      let detalleReportOut: RepAdmFormatosOut;
      let detalleReportin: RepAdmFormatosIn = new RepAdmFormatosIn();
      detalleReportin = new RepAdmFormatosIn();
      detalleReportin.Numero = this.GeneralesVentas.value["numero"];
      detalleReportin.Documento = this.GeneralesVentas.value["type"];
      this.repAdm.repDev(detalleReportin).subscribe(dev => {
          detalleReportOut = dev;

          if (dev.FormatosResult.Error || dev.FormatosResult.Encabezado == null && dev.FormatosResult.Renglones == null) {
            swal(
              dev.FormatosResult.Error? "ERROR": "INFO",
              dev.FormatosResult.Error?dev.FormatosResult.Error.toString(): "Debe tipear un número válido",
              dev.FormatosResult.Error? "error": "info")
              .then((value) => {
                if (value || value == null) {
                  this.global.hideLoading();
                }
              });

          } else {
            this.pdfPV.pdfPlantilla(detalleReportOut);
            this.global.hideLoading();
          }
        },
        error => {});
    }
  }

  onSearch() {
    this.input$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(term => this.fakeService(term))
      )
      .subscribe((data: any) => {
        this.clienteBuffer = data.slice(0, this.bufferSize);
      })
  }


  private fakeService(term) {
    let listaCli: ListarClientesIn = new ListarClientesIn();
    return this.listaC.asCli(listaCli).pipe(map(data => data.Lista.filter((x) => x.sCodigo.includes(term) || x.sDescripcion.includes(term))));
  }


}
