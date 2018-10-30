import {
  Injectable
} from '@angular/core';
import {
  ExportService,
  imagenconstr
} from '../../../parent/export.service';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable()
export class PdfListadoPrecioStockService extends ExportService {

  constructor() {
    super();
  }

  public pdfListadoPrecioStock(dout: any) {
    var self = this;
    var dd = {
      info :{
        title : 'Lista de precios stock'
      },
      header: function (currentPage, pageCount) { /*Tabla del header*/
        return {
          table: {
            widths: ['20%', '49%', '35%'],
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
                  fontSize: 12
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
                      currentPage.toString() + '/' + pageCount.toString(),
                    ]
                  ],
                  alignment: 'left'
                }
              ], //Fin Primera Fila
              [ //Segunda fila
                {
                  text: 'LISTA DE PRECIOS STOCK',
                  style: 'header',
                  colSpan: 3,
                  alignment: 'center'
                }, {}, {}
              ], //Fin Segunda Fila
            
              [ //5ta fila
                {
                  style: 'tableExample',
                  table: {
                    widths: [90, 210, 30, 80, 80],
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
                          text: 'Unid.',
                          style: 'hTable',
                          border: [false, true, false, true],
                        },
                        {
                          text: 'Stock Actual',
                          style: 'hMTable',
                          alignment: 'right',
                          border: [false, true, false, true],
                        },
                        {
                          text: 'P.V.P.',
                          style: 'hTable',
                          alignment: 'right',
                          border: [false, true, false, true],
                        },
                      ],

                    ]
                  },
                  colSpan: 3,
                  alignment: 'center',
                }, {}, {}
              ] //Fin 5ta Fila
            ]
          },
          layout: 'noBorders',
          style: 'headerTable'
        }
      },
      content: [
        //Body este se llena con campos dinamicos
        {
          table: {
            widths: [90, 200, 30, 70, 80],
          
            body: this.buildTableBodyBest(dout, ['Co_art', 'Art_des', 'Uni_vta', 'stock_act', 'prec_vta1'],
              ['', '', '', '', ''])
          },
          layout: 'lightHorizontalLines'
        },
        // fin Body
        //Footer
        {
          table: {
            widths: [90, 230, 0, 70, 80],
            body: 
            [
              [
                {
                  text: '',
                },
                {
                  text: '',
                },
                {
                  text: '',
                },
                {
                  text: '',
                },
                {
                  text: '',
                }
              ],
              [
                {
                  text: '',
                },
                {
                  text: 'TOTAL STOCK:',
                  bold: true,
                  alignment : 'right',
                },
                {
                  text: '',
                },
               
                {
                  text: this.moneyTrans(this.sumarMontoRenglones(dout, 'stock_act')),
                  bold: true,
                  alignment : 'right',
                },
                {
                  text: this.moneyTrans(this.sumarMontoRenglones(dout, 'prec_vta1')),                  
                  bold: true,
                  alignment : 'right',
                }
              ],

            ],
        
          },
          layout: 'lightHorizontalLines'
        },
        // fin Footer
      ],
      styles: {
        hMTable: {
          bold: true,
          alignment: 'right'
        },
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
          margin: [40, 10, 10, 8]
        },
        tableHeader2: {
          bold: true,
          alignment: 'right'
        },
        tableHeader: {
          bold: true,
        },
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'justify'
        }
      },
      pageSize: 'LEGAL',
      pageMargins: [42, 140, 10, 20], //Content margins
      defaultStyle: {
        fontSize: 8
      }
    }
    pdfMake.createPdf(dd).open();
  }
}
