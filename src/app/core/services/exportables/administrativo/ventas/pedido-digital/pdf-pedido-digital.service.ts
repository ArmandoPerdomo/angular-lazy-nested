import {
  Injectable
} from '@angular/core';
import {
  ExportService,
  imagenconstr
} from '../../../parent/export.service';
import {
  RepAdmFormatosOut
} from '../../../../../../abstract/DTO/out/reportes/repAdmFormatos/repAdmFormatos';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable()
export class PdfPedidoDigitalService extends ExportService {

  constructor() {
    super();
  }

  public pdfPedido(dr: RepAdmFormatosOut) {
    var self = this;
    var externalDataRetrievedFromServer = dr.FormatosResult.Renglones;
    const docDefinition = {
      pageSize: 'LEGAL',
      pageMargins: [40, 110, 40, 100],
      info: {
        title: 'Pedido digital - Nro. '+dr.FormatosResult.Encabezado.Numero
      },
      // ------------------------------ HEADER -------------------------------------
      header: function (currentPage, pageCount) {
        var headerObj = {
          columns: [{
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
                widths: [70,80],
                body:
                [
                  [{text:'\nNro:',bold: 'true'},{text: '\n' + dr.FormatosResult.Encabezado.Numero.toString(),alignment: 'right'}],
                  [{text:'Fecha de Emisión:',bold: 'true'},{text: self.transformDateTable(dr.FormatosResult.Encabezado.FechaEmis.toString()), alignment: 'right'}],
                  [{text:'Condición de Pago:',bold: 'true'},{text: dr.FormatosResult.Encabezado.CondicionPago.toString(), alignment: 'right'}],
                  [{text:'Vendedor:',bold: 'true'},{text:dr.FormatosResult.Encabezado.Vendedor.toString(), alignment: 'right'}],
                  [{text:'Teléfono:',bold: 'true'},{text: dr.FormatosResult.Encabezado.TelefonoVen.toString(), alignment: 'right'}],
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
    
                margin: [5, 2, 10, 20],
                widths: [100, 423],
                body: [
                  ['Nombre o Razón Social:', dr.FormatosResult.Encabezado.RazonSocial.toString()],
                  ['Rif C.I:', dr.FormatosResult.Encabezado.Rif.toString()],
                  ['Domicilio Fiscal:', dr.FormatosResult.Encabezado.DomicioFiscal.toString()],
                  ['Teléfono:', dr.FormatosResult.Encabezado.TelefonoCli.toString()],
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
              style: 'tableExample',
              table: {
                widths: [70, 180, 28, 33, 50, 30, 55],
                body: self.buildTableBodyBest(externalDataRetrievedFromServer,
                  ['Codigo', 'Descripcion', 'Unidad', 'Cantidad', 'Precio', 'Descuento', , 'Total'],
                  [
                    {text:'Código', bold: 'true'}, 
                    {text:'Descripción', bold: 'true'},
                    {text:'Unidad', bold: 'true'}, 
                    {text:'Cantidad', bold: 'true', alignment:'right'}, 
                    {text:'Prec. Uni.', bold: 'true', alignment:'right'},  
                    {text:'Desc%',  bold: 'true', alignment:'right'}, 
                    {text:'Total', bold: 'true', alignment:'right'}, 
                  ])
              },
              layout: 'lightHorizontalLines',alignment:'left',
            }
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
                      ['',{text:'OBSERVACIONES:', bold:'true'}],
                      ['', ''],
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
                      ['\n'],
                    ]
                  },
                  layout: 'noBorders'
                },
                {
                  style: 'tableExample2',
                  table: {
                    body:
                    [
                      [{text:'%DESC.:',bold:'true'}, {text:dr.FormatosResult.Encabezado.Descuento.toString() , alignment: 'right'}],
                      [{text:'SUB-TOTAL :',bold:'true'}, {text:self.moneyTrans(dr.FormatosResult.Encabezado.MontoSubTotal.toString()), alignment: 'right'}],
                      [{text:'IVA 0.0 %',bold:'true'}, {text:self.moneyTrans(dr.FormatosResult.Encabezado.MontoIva.toString()), alignment: 'right'}],
                      [{text:'NETO:',bold:'true'}, {text:self.moneyTrans(dr.FormatosResult.Encabezado.Neto.toString()), alignment: 'right'}],
                    ]
                  },
                  layout: 'noBorders'
                }
              ],
              margin: [35, 2, 10, 20],
            };
          },
    };
    pdfMake.createPdf(docDefinition).open();
  }
}