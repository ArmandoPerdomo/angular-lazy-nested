import { Component, OnInit, Input } from '@angular/core';
import { FormatoAdmCompras } from '../../../../../../abstract/DTO/formatoadmcompras';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RepAdmFormatosCobPagService } from '../../../../../../core/services/reportes/repAdmFormatosCobPag.service';
import { FormControlService } from '../../../../../../core/services/form-control.service';
import { Location } from '@angular/common';
import { RepAdmFormatosOut } from '../../../../../../abstract/DTO/out/reportes/repAdmFormatos/repAdmFormatos';
import { RepAdmFormatosIn } from '../../../../../../abstract/DTO/in/reportes/repAdmFormatosIn';
import { RepAdmFormatosService } from '../../../../../../core/services/reportes/repAdmFormatos.service';
import { RepAdmFormatosCobPagOut } from '../../../../../../abstract/DTO/out/reportes/repAdmFormatosCobPag/repAdmFormatosCobPag';
import { RepAdmFormatosCobPagIn } from '../../../../../../abstract/DTO/in/reportes/repAdmFormatosCobPagIn.';
import { Globals } from '../../../../../../core/services/globals.service';
import { PdfPagoDigitalService } from '../../../../../../core/services/exportables/administrativo/compras/pagos-digital/pdf-pago-digital.service';
import { PdfOrdenCompraService } from '../../../../../../core/services/exportables/administrativo/compras/orden-compra/pdf-orden-compra.service';
import { PdfDevolucionProveedorService } from '../../../../../../core/services/exportables/administrativo/compras/devolucion-proveedor/pdf-devolucion-proveedor.service';
import { PdfCotizacionProveedorService } from '../../../../../../core/services/exportables/administrativo/compras/cotizacion-proveedor/pdf-cotizacion-proveedor.service';
import { PdfFacturaCompraService } from '../../../../../../core/services/exportables/administrativo/compras/factura-compra/pdf-factura-compra.service';
import { PdfNotasRecepcionService } from '../../../../../../core/services/exportables/administrativo/compras/notas-recepecion/pdf-notas-recepcion.service';

@Component({
  selector: 'app-formato-adm-compras',
  templateUrl: './formato-adm-compras.component.html',
  styleUrls: ['./formato-adm-compras.component.css']
})
export class FormatoAdmComprasComponent implements OnInit {


  sCodigo: String;
  sDescripcion: String;
  GeneralesCompras: FormGroup;
  num = 0;
  env = '';
  @Input() formatoadmcompras: FormatoAdmCompras;

  constructor(private  location: Location,
    public router: Router, private repAdm: RepAdmFormatosService,
    public repAdmCobPag: RepAdmFormatosCobPagService,public global: Globals,
    public formService: FormControlService,
    public pdfPD: PdfPagoDigitalService, public pdfOC: PdfOrdenCompraService,
    public pdfDP: PdfDevolucionProveedorService, public pdfCP: PdfCotizacionProveedorService,
    public pdfFC: PdfFacturaCompraService, public pdfNR: PdfNotasRecepcionService) {

  }
  limpiar() {
    this.num = 0;
    this.env = '';

  }
  //? Evento para el padre
  receiveNum($event) {
    this.num = $event
  }
  //? Evento doble click
  receiveAccept(){
   this.Aceptar();
  }

  ngOnInit() {
     //? metodo para validar campos
     this.GeneralesCompras= new FormGroup ({
      numero: new FormControl('', [Validators.required]),
      cliente: new FormControl(''),
      enviar: new FormControl('', [Validators.required]),
      type: new FormControl(this.formatoadmcompras.type),
      titulo: new FormControl(this.formatoadmcompras.titulo),
      titulo_detalle: new FormControl(this.formatoadmcompras.titulo_detalle)
    });

  }

  Aceptar() {
    //* validando Formulario
     this.formService.markFormGroupTouched(this.GeneralesCompras);
    if (this.GeneralesCompras.valid){
      if (this.GeneralesCompras.value["numero"] == 0){
        swal("","Debe especificar un número de Documento.","info")
        .then((value) => {
          if (value || value==null) {
          }
        });
      }else if (this.GeneralesCompras.value["enviar"] == "Listado"){
        if (this.GeneralesCompras.value["type"]=='PAGO') {
          this.router.navigate([`${this.router.url}/detalle`], { queryParams: this.GeneralesCompras.value });
        } else {
          this.router.navigate([`${this.router.url}/detalle`], { queryParams: this.GeneralesCompras.value });
        }
      }else{
        this.createPdf();
        this.global.hideLoading();
      }
    } else {
      swal("","Debe seleccionar una opción válida.","info")
      .then((value) => {
        if (value || value==null) {
          this.global.hideLoading();
        }
      }); 
    }
  }
  goBack(): void {
    this.router.navigate([`app/reportes/dashboard`]);
  }

   createPdf() {
    this.global.showLoading();
    let msjerror : string = "";
     if (this.GeneralesCompras.value["type"]==='PAGO')
     {
        let detalleReportOut: RepAdmFormatosCobPagOut;
        let detalleReportin: RepAdmFormatosCobPagIn = new RepAdmFormatosCobPagIn();
        detalleReportin = new RepAdmFormatosCobPagIn();
        detalleReportin.Numero = this.GeneralesCompras.value["numero"];
        detalleReportin.Documento = this.GeneralesCompras.value["type"];
        
        this.repAdmCobPag.repDev(detalleReportin).subscribe(dev => {
          if (dev.FormatosCobPagResult.Error.toString() == ""){
            msjerror = "No hay información que mostrar";
          }else{
            msjerror = dev.FormatosCobPagResult.Error.toString();
          }

           if(dev.FormatosCobPagResult.Error || dev.FormatosCobPagResult.DocumentosAsociados == null &&  dev.FormatosCobPagResult.Encabezado == null){

            //swal("",msjerror,"info")
            swal(
              dev.FormatosCobPagResult.Error? "ERROR":"INFO",
              msjerror,
              dev.FormatosCobPagResult.Error? "error":"info")
              .then((value) => {
                if (value || value==null) {

                }
              });
          }else{
            
          detalleReportOut = dev;
          this.pdfPD.pdfComprasPago(detalleReportOut);
          this.global.hideLoading();

          }
        },
        error => {
        }
      );
     } else if (this.GeneralesCompras.value["type"]==='ORDENC'){
      let detalleReportOut: RepAdmFormatosOut;
      let detalleReportin: RepAdmFormatosIn = new RepAdmFormatosIn();
      detalleReportin = new RepAdmFormatosIn();
      detalleReportin.Numero = this.GeneralesCompras.value["numero"];
      detalleReportin.Documento = this.GeneralesCompras.value["type"];
      this.repAdm.repDev(detalleReportin).subscribe(dev => {

      
        
        if(dev.FormatosResult.Renglones == null &&  dev.FormatosResult.Encabezado == null){

          swal("","No hay información que imprimir","info")
            .then((value) => {
              if (value || value==null) {

              }
            });
        }else{
          detalleReportOut = dev;
          this.pdfOC.pdfOrdenC(detalleReportOut);
          this.global.hideLoading(); 
        }
        },
        error => {
        }
      );
     } else if (this.GeneralesCompras.value["type"]==='DEV_PROV'){
      let detalleReportOut: RepAdmFormatosOut;
      let detalleReportin: RepAdmFormatosIn = new RepAdmFormatosIn();
      detalleReportin = new RepAdmFormatosIn();
      detalleReportin.Numero = this.GeneralesCompras.value["numero"];
      detalleReportin.Documento = this.GeneralesCompras.value["type"];
      this.repAdm.repDev(detalleReportin).subscribe(dev => {
       

        if(dev.FormatosResult.Renglones == null &&  dev.FormatosResult.Encabezado == null){

          swal("","No hay información que imprimir","info")
            .then((value) => {
              if (value || value==null) {

              }
            });
        }else{
          detalleReportOut = dev; 
          this.global.hideLoading(); 
          this.pdfDP.pdfDevolucionCompra(detalleReportOut);
        }
        },
        error => {
        }
      );
     } else if (this.GeneralesCompras.value["type"]==='COTIZ_P'){
      let detalleReportOut: RepAdmFormatosOut;
      let detalleReportin: RepAdmFormatosIn = new RepAdmFormatosIn();
      detalleReportin = new RepAdmFormatosIn();
      detalleReportin.Numero = this.GeneralesCompras.value["numero"];
      detalleReportin.Documento = this.GeneralesCompras.value["type"];
      this.repAdm.repDev(detalleReportin).subscribe(dev => {
        if(dev.FormatosResult.Renglones == null &&  dev.FormatosResult.Encabezado == null){

          swal("","No hay información que imprimir","info")
            .then((value) => {
              if (value || value==null) {

              }
            });
        }else{
          detalleReportOut = dev;
          this.global.hideLoading();  
          this.pdfCP.pdfCotizacionCompra(detalleReportOut);
        }
        },
        error => {
        }
      );
     } else if (this.GeneralesCompras.value["type"]==='NOTA_R') {
      let detalleReportOut: RepAdmFormatosOut;
      let detalleReportin: RepAdmFormatosIn = new RepAdmFormatosIn();
      detalleReportin = new RepAdmFormatosIn();
      detalleReportin.Numero = this.GeneralesCompras.value["numero"];
      detalleReportin.Documento = this.GeneralesCompras.value["type"];
      this.repAdm.repDev(detalleReportin).subscribe(dev => {
        //

        if(dev.FormatosResult.Renglones == null &&  dev.FormatosResult.Encabezado == null){

          swal("","No hay información que imprimir","info")
            .then((value) => {
              if (value || value==null) {

              }
            });
        }else{
          detalleReportOut = dev;
          this.global.hideLoading();  
          this.pdfNR.pdfNotasRecepcion(detalleReportOut);
        }
        },
        error => {
        }
      );
     } else if (this.GeneralesCompras.value["type"]==='COMPRAS'){
      let detalleReportOut: RepAdmFormatosOut;
      let detalleReportin: RepAdmFormatosIn = new RepAdmFormatosIn();
      detalleReportin = new RepAdmFormatosIn();
      detalleReportin.Numero = this.GeneralesCompras.value["numero"];
      detalleReportin.Documento = this.GeneralesCompras.value["type"];
      this.repAdm.repDev(detalleReportin).subscribe(dev => {
        //

        if(dev.FormatosResult.Renglones == null &&  dev.FormatosResult.Encabezado == null){

          swal("","No hay información que imprimir","info")
            .then((value) => {
              if (value || value==null) {

              }
            });
        }else{
          detalleReportOut = dev;
          this.global.hideLoading();  
          this.pdfFC.pdfFacturaCompra(detalleReportOut);
        }
        },
        error => {
        }
      );

     }
   }

}
