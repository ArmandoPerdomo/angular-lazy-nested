import { Injectable } from '@angular/core';
import { ExportService, imagenconstr } from '../../../parent/export.service';
import { RepAdmFormatoPago2Out } from '../../../../../../abstract/DTO/out/reportesAdmCajaBlanco/repAdmFormatoPago2/repAdmFormatoPago2Out';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable()
export class PdfOrdenPagoService extends ExportService {

  constructor() {
    super();
  }

  public pdfOrdenDePago(detalleReport: RepAdmFormatoPago2Out) {
    var self = this;
    const docDefinition = { 
      pageSize: 'LETTER',
      pageMargins: [40, 110, 40, 100],
      info:{
        title: 'Órden pago digital - nro. '+  detalleReport.RepFormatoPago2Result.Documeto[0].Numero,
      },
      // ------------------------------ HEADER -------------------------------------
      header: function (currentPage, pageCount) {
        var headerObj = {
          columns: [
            {
              image: imagenconstr,
              width: 140,
              height: 80,
              margin: [7, 2, 10, 20]
            },
            {
              text: '\n\nAv. Los Pinos, entre calle Pomagas y Los Mangos, Casa Nro. 35 Urb. La Florida Norte, Zona Portal 1050 Ofi. +58212731.2087',
              alignment: 'center',
              fontSize: 12,
              width: 250,
            },
            {
              style: 'tableExample2',
              table: {
                margin: [3, 2, 10, 5],
                widths: [70,80],
                body: [
                  [{text:'\n\nOrden de pago:',bold: 'true'},{text:'\n\n' + detalleReport.RepFormatoPago2Result.Documeto[0].Numero.toString(), alignment: 'right'}],
                  [{text:'Fecha de emisión:',bold: 'true'},{text: self.transformDateTable(detalleReport.RepFormatoPago2Result.Documeto[0].FechaEmis.toString()), alignment: 'right'}],
                  [{text:'Fecha de pago:',bold: 'true'},{text:self.transformDateTable(detalleReport.RepFormatoPago2Result.Documeto[0].FechaPago.toString()), alignment: 'right'}],
                ]
              },
              layout: 'noBorders'
            }
          ],
          margin: [5, 5],
          columnGap: 10,
        };
        return headerObj;
      },
      // ------------------------------ Contenido -------------------------------------
      content: [{
          // ------------------------------ Primer Bloque -------------------------------------
          style: 'tableExample4',
          table: {
            margin: [5, 2, 10],
            widths: [60, 100, 60, 100,60, 100],
            body: [
              ['Beneficiario:', detalleReport.RepFormatoPago2Result.Documeto[0].Beneficiario.toString(), '' , '' , 'Forma de Pago:' ,detalleReport.RepFormatoPago2Result.Documeto[0].FormaPago.toString()],
              ['Telefonos:', detalleReport.RepFormatoPago2Result.Documeto[0].Telefonos.toString(), '' , '', 'Estatus:', detalleReport.RepFormatoPago2Result.Documeto[0].Status.toString()],
              ['Cuenta:', detalleReport.RepFormatoPago2Result.Documeto[0].Cuenta.toString(), '', '',  'Banco:', detalleReport.RepFormatoPago2Result.Documeto[0].Banco.toString()],
              ['Nro dcto:', detalleReport.RepFormatoPago2Result.Documeto[0].NroCheque.toString(), '', '',  'Impuesto:', self.moneyTrans(detalleReport.RepFormatoPago2Result.Documeto[0].Impuesto.toString())],
              ['Cta. ingreso:', detalleReport.RepFormatoPago2Result.Documeto[0].CtaIngreso.toString(), 'Moneda:', detalleReport.RepFormatoPago2Result.Documeto[0].Moneda.toString(), 'IVA:', self.moneyTrans(detalleReport.RepFormatoPago2Result.Documeto[0].Iva.toString())],
              
            ]
          },
          layout: {
            hLineWidth: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 2 : 1;
            },
            vLineWidth: function (i, node) {
              return (i === 0 || i === node.table.widths.length) ? 2 : 1;
            },
            hLineColor: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 'black' : 'white';
            },
            vLineColor: function (i, node) {
              return (i === 0 || i === node.table.widths.length) ? 'black' : 'white';
            },
          }
        },
        // ------------------------------ Segundo bloque (TABLA DINÁMICA) -------------------------------------
        {
          // ------------------------------ Primer Bloque -------------------------------------
          style: 'tableExample4',
          table: {
            margin: [5, 2, 10],
            widths: [480, 35  ],
            body: [
              ['Descripcion:', ''],
              [detalleReport.RepFormatoPago2Result.Documeto[0].Descripcion.toString(), ''],
            ]
          },
          layout: {
            hLineWidth: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 2 : 1;
            },
            vLineWidth: function (i, node) {
              return (i === 0 || i === node.table.widths.length) ? 2 : 1;
            },
            hLineColor: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 'black' : 'white';
            },
            vLineColor: function (i, node) {
              return (i === 0 || i === node.table.widths.length) ? 'black' : 'white';
            },
          }
        },
        ////////////////////////! ////////////////////////////////////////////////////
      ], //Fin del contenido
      styles: {
        header: {
          fontSize: 8,
          bold: true,
        },
        footer: {
          fontSize: 8,
          bold: true,
        },
        tableExample: {
          margin: [0, 5, 0, 15],
          fontSize: 8,
          alignment: 'center'
        },
        tableExample4: {
          margin: [0, 5, 0, 15],
          fontSize: 8,
        },
        tableExample2: {
          margin: [0, 5, 0, 15],
          fontSize: 8,
        },
      },
      // ------------------------------ FOOTER -------------------------------------
      footer: function (currentPage, pageCount) {
        return {
          columns: [{
              style: 'tableExample2',
              table: {
                width: '40%',
                body: [
                  [''],
                  [''],
                  [''],
                ]
              },
              layout: 'noBorders'
            },
            {
              width: '50%',
              table: {
                alignment: 'center',
                style: 'tableExample2',
                body: [
                  ['\n'],
                  ['\n'],
                  ['\n'],
                ]
              },
              layout: 'noBorders'
            },
            {
              style: 'tableExample2',
              table: {
                body: [
                  [{text:'Monto Neto:', bold: true}, {text:self.moneyTrans(detalleReport.RepFormatoPago2Result.Documeto[0].MontoNeto.toString()), alignment: 'right'}],
                  [{text:'I.S.L.R:', bold: true}, {text:self.moneyTrans(detalleReport.RepFormatoPago2Result.Documeto[0].ISLR.toString()), alignment: 'right'}],
                  [{text:'Monto a Pagar:', bold: true}, {text:self.moneyTrans(detalleReport.RepFormatoPago2Result.Documeto[0].MontoaPagar.toString()), alignment: 'right'}],
                ]
              },
              layout: 'noBorders'
            }
          ],
        };
      },
    };

    pdfMake.createPdf(docDefinition).open();
  }
}