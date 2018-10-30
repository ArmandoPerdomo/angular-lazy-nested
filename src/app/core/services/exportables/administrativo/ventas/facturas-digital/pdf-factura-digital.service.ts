import { Injectable } from '@angular/core';
import { ExportService, imagenconstr } from '../../../parent/export.service';
import { RepAdmFormatosOut } from '../../../../../../abstract/DTO/out/reportes/repAdmFormatos/repAdmFormatos';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable()
export class PdfFacturaDigitalService extends ExportService {

  constructor() {
    super();
  }

  public pdfFacDig(dr: RepAdmFormatosOut) {
    var self = this;
    var externalDataRetrievedFromServer = dr.FormatosResult.Renglones;
    //FUNCIONES REQUETEIMPORTANTES:


    //Fin a funciones Requeteimportantes ----------------------------
    const docDefinition = {
      pageSize: 'LETTER',
      pageMargins: [30, 155, 40, 100],
      info: {
        title: 'Factura digital - Nro. '+dr.FormatosResult.Encabezado.Numero
      },
      // ------------------------------ HEADER -------------------------------------
      header: function (currentPage, pageCount) {
        var headerObj =
         {
          table: 
          {
            body:
            [
              [
                {
                  table:
                  {
                    widths: [59,5,38,5,55,5,36,5, 45],
                    body: 
                    [
                      [
                        {text:'Forma de pago:',border: [false, false, false, false]},'',
                        {text:'Efectivo:',border: [false, false, false, false]},'',
                        {text:'T.D.D / T.D.C:',border: [false, false, false, false]},'',
                        {text:'Depósito:',border: [false, false, false, false]},'',
                        {text:'Cheque nro.:',border: [false, false, false, false]}
                      ]
                    ]
                  },  margin: [25,20,0,0], fontSize: 8
                }
              ],
              [
                {  columns: 
                [
                    {
                    image: imagenconstr,
                    width: 140,
                    height: 80,
                      margin: [0, 2, 10, 20]
        
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
                          [{text:'Nro:',bold: 'true'},{text:'00-'  + dr.FormatosResult.Encabezado.Numero.toString(), alignment: 'right'}],
                          [{text:'Forma Libre:',bold: 'true'}, ''],
                          [{text:'Fecha de Emisión:',bold: 'true'},{text: self.transformDateTable(dr.FormatosResult.Encabezado.FechaEmis.toString()), alignment: 'right'}],
                          [{text:'Condición de Pago:',bold: 'true'},{text: dr.FormatosResult.Encabezado.CondicionPago.toString(), alignment: 'right'}],
                          [{text:'Vendedor:',bold: 'true'}, {text:dr.FormatosResult.Encabezado.Vendedor.toString(), alignment: 'right'}],
                          [{text:'Teléfono:',bold: 'true'},{text:dr.FormatosResult.Encabezado.TelefonoVen.toString(), alignment: 'right'}],
                        ]
                      },
                      layout: 'noBorders'
                    }
                ],
                
                margin: [5, 5],
                columnGap: 10,}
              ]
            ]
          },    layout: 'noBorders'
        
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
            body:
            [
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
          layout: 'lightHorizontalLines', alignment: 'left'
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
                  [{text:'OBSERVACIONES:', bold:'true'}],
                  [dr.FormatosResult.Encabezado.Observaciones],
                  [dr.FormatosResult.Encabezado.FormaPago],
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
                body: [
                  [{text:'%DESC.:',bold:'true'}, {text:dr.FormatosResult.Encabezado.Descuento.toString() , alignment: 'right'}],
                  [{text:'SUB-TOTAL :',bold:'true'}, {text:self.moneyTrans(dr.FormatosResult.Encabezado.MontoSubTotal.toString()), alignment: 'right'}],
                  [{text:'IVA 0.0 %',bold:'true'}, {text:self.moneyTrans(dr.FormatosResult.Encabezado.MontoIva.toString()), alignment: 'right'}],
                  [{text:'NETO:',bold:'true'}, {text:self.moneyTrans(dr.FormatosResult.Encabezado.Neto.toString()), alignment: 'right'}],
                ]
              },
              layout: 'noBorders'
            }
          ],
          margin: [35, 0, 10, 20],

        };
      },
    };

    pdfMake.createPdf(docDefinition).open();
  }
}
