import { Injectable } from '@angular/core';
import { ExportService, imagenconstr } from '../../../parent/export.service';
import { RepAdmStockDisponibleIn } from '../../../../../../abstract/DTO/in/reportesAdmInventario/repAdmStockDisponibleIn';
import { RepAdmStockDisponibleOut } from '../../../../../../abstract/DTO/out/reportesAdmInventario/repAdmStockDisponible/repAdmStockDisponibleOut';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable()
export class PdfStockDisponibleService extends ExportService {

  constructor() {
    super();
  }

  //?PDFMake para Stock Disponible.
  public pdfStockDisponible(rin: RepAdmStockDisponibleIn, rout: RepAdmStockDisponibleOut) {
    var self = this;
    var dd = {
      info: {
        title: 'Stock disponible'
      },
      header: function (currentPage, pageCount) { /*Tabla del header*/
        return {
          table: {
            widths: ['20%', '48%', '35%'],
            heights: ['auto', 'auto', 'auto'],
            body: [
              [ //Primera fila
                { //Imagen
                  image: imagenconstr,
                  width: 140,
                  height: 80
                },
                { //Membrete
                  text: '\nAv. Los Pinos, entre calle Pomagas y Los Mangos,Casa Nro. 35 Urb. La Florida Norte, Zona Portal 1050 Ofi. +58212731.2087',
                  alignment: 'center',
                  fontSize: 12,
                  margin: [50, 0, 0, 0]
                },
                { //Detalles
                  columns: [
                    [ //Fila
                      {
                        text: '\n\nFecha de Emisión:  ',
                        bold: 'true'
                      },
                      {
                        text: 'Hora:  ',
                        bold: 'true'
                      },
                      {
                        text: 'Página:  ',
                        bold: 'true'
                      },
                    ],
                    [
                      '\n\n',
                      self.currentDate[0],
                      self.currentDate[1] + ' ' + self.currentDate[2] + self.currentDate[3],
                      currentPage.toString() + '/' + pageCount.toString()
                    ]
                  ],
                  alignment: 'left',
                  margin: [30, 0, 0, 0]
                }
              ], //Fin Primera Fila
              [ //Segunda fila
                {
                  text: 'STOCK DISPONIBLE (Orden: Código)',
                  style: 'header',
                  colSpan: 3,
                  alignment: 'center'
                }, {}, {}
              ], //Fin Segunda Fila

              [ //Cuarta fila
                {
                  style: 'tableExample',
                  table: {
                    widths: [100, 185, 50, 75, 73, 53],
                    body: [
                      [{
                          text: 'Código',
                          style: 'hTable',
                          border: [false, true, false, true],
                          
                        },
                        {
                          text: 'Descripción',
                          style: 'hTable',
                          border: [false, true, false, true],
                          
                        },
                        {
                          text: 'Unidad',
                          style: 'hTable',
                          border: [false, true, false, true],
                          
                        },
                        {
                          text: 'Stock Guarenas',
                          style: 'hTable',
                          border: [false, true, false, true],
                          
                        },
                        {
                          text: 'Comprometido',
                          style: 'hTable',
                          border: [false, true, false, true],
                          
                        },
                        {
                          text: 'Actual',
                          style: 'hTable',
                          border: [false, true, false, true],
                          alignment: 'right'
                        }
                      ],
                    ]
                  },
                  colSpan: 3,
                  alignment: 'center'
                }
              ] //Fin 4ta Fila
            ]
          },
          layout: 'noBorders',
          style: 'headerTable'
        }
      },
      content: [{
        style: 'tableExample',
        table: {
          widths: [95, 185, 40, 70, 60, 60],
          body: this.buildTableBodyBest(rout.RepStockDisponibleResult.Stock,
            ['Co_art', 'Art_des', 'Uni_vta', 'Stock_act', 'Stock_Comp', 'Stock_Disp'],
            ['', '', '', '', '', ''])
        },
        layout: 'lightHorizontalLines'
      }, ],
      styles: {
        hTable: {
          bold: true,
          alignment: 'left'
        },
        bMTable: {
          alignment: 'right'
        },
        bTable: {
          alignment: 'justify'
        },
        headerTable: {
          margin: [10, 0, 0, 10],
          alignment: 'justify'
        },

        header: {
          fontSize: 18,
          bold: true,
          alignment: 'justify'
        }

      },
      pageSize: 'LEGAL',
      pageOrientation: 'portrait',
      pageMargins: [10, 130, 10, 10], //Content margins
      defaultStyle: {
        fontSize: 9
      }
    }
    pdfMake.createPdf(dd).open();
  }
}
