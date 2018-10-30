import {
  Injectable
} from '@angular/core';
import {
  ExportService,
  imagenconstr
} from '../../../parent/export.service';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import {
  RepAdmPagoxNumeroOut
} from '../../../../../../abstract/DTO/out/reportesAdmCompras/repAdmPagoxNumero/repAdmPagoxNumeroOut';
import {
  RepAdmPagoxNumeroIn
} from '../../../../../../abstract/DTO/in/reporteAdmCompras/repAdmPagoxNumeroIn';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable()
export class PdfPagoNumeroService extends ExportService {

  constructor() {
    super();
  }

  public pdfPagoXNumero(dc: RepAdmPagoxNumeroOut, din: RepAdmPagoxNumeroIn) {
    var self = this;
    var dd = {
      info :{
        title : 'Pago por número'
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
                  text: 'PAGO POR NÚMERO',
                  style: 'header',
                  colSpan: 3,
                  alignment: 'center'
                }, {}, {}
              ], //Fin Segunda Fila
              [ //Tercera fila
                {
                  style: 'tableExample',
                  table: {
                    headerRows: 1,
                    body: [
                      [{
                          text: 'RANGOS',
                          style: 'tableHeader'
                        },
                        {
                          text: 'Número:',
                          style: 'tableHeader2'
                        }, ' Desde:', din.NumeroD, 'Hasta:', din.Numeroh,
                        {
                          text: 'Fecha:',
                          style: 'tableHeader2'
                        }, ' Desde:',
                        self.transform(din.FechaD),
                        'Hasta:', self.transform(din.Fechah),
                      ],
                    ]
                  },
                  colSpan: 3,
                  alignment: 'center',
                  layout: 'noBorders',
                  margin: [120, 0, 0, 0]
                }, {}, {}
              ], //Fin Tercera Fila
              [ //4ta fila
                {
                  style: 'tableExample',
                  table: {
                    headerRows: 1,
                    body: [
                      [{
                          text: 'CONDICIÓN:',
                          style: 'tableHeader'
                        },
                        {
                          text: '',
                          style: 'tableHeader2'
                        },
                        din.Condicion, '', '',
                        {
                          text: 'MONEDA:',
                          style: 'tableHeader2'
                        },
                        din.Moneda,
                      ],
                    ]
                  },
                  colSpan: 3,
                  alignment: 'center',
                  layout: 'noBorders',
                  margin: [230, 0, 0, 0]
                }, {}, {}
              ], //Fin 4ta Fila
              [ //5ta fila
                {
                  style: 'tableExample',
                  table: {
                    widths: [30, 52, 90, 45, 30, 55, 38, 70, 55],
                    body: [
                      [{
                          text: 'Número',
                          style: 'hTable',
                          border: [false, true, false, true],
                        },
                        {
                          text: 'Fecha Pago',
                          style: 'hTable',
                          border: [false, true, false, true],
                        },
                        {
                          text: 'Proveedor',
                          style: 'hTable',
                          border: [false, true, false, true],
                        },
                        {
                          text: 'Neto',
                          style: 'hMTable',
                          alignment: 'right',
                          border: [false, true, false, true],
                        },
                        {
                          text: 'Forma Pago',
                          style: 'hTable',
                          border: [false, true, false, true],
                        },
                        {
                          text: 'Nro. Doc',
                          style: 'hTable',
                          border: [false, true, false, true],
                        },
                        {
                          text: 'Caja/Cta.',
                          style: 'hTable',
                          border: [false, true, false, true],
                        },
                        {
                          text: 'Descripción',
                          style: 'hTable',
                          border: [false, true, false, true],
                        },
                        {
                          text: 'Monto',
                          style: 'hMTable',
                          alignment: 'right',
                          border: [false, true, false, true],
                        }
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
            widths: [26, 46, 75, 50, 25, 45, 30, 65, 55],
            body: this.buildTableBodyBest(dc.RepPagoxNumeroResult.PagosXNumero, ['Numero', 'Fecha', 'Proveedor', 'Neto', 'FormaPago', 'NDoc', 'CajaCta', 'Descripcion', 'Monto'],
              ['', '', '', '', '', '', '', '', ''])
          },
          layout: 'lightHorizontalLines'
        },
        // fin Body
        //Footer
        {
          table: {
            widths: [26, 46, 75, 50, 25, 45, 10, 65, 75],
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
                  text: ''
                }
              ],
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
                },
                {
                  text: '',
                },
                {
                  text: '',
                },
                {
                  text: 'TOTAL MONTO:',
                  style: 'hTable',
                  alignment : 'right',
                  border: [false, true, false, false],
                },
                {
                  text: this.moneyTrans(this.sumarMontoRenglones(dc.RepPagoxNumeroResult.PagosXNumero)),
                  style: 'hTable',
                  alignment : 'right',
                }
              ]
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
          margin: [30, 10, 10, 8]
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
      pageMargins: [32, 174, 10, 20], //Content margins
      defaultStyle: {
        fontSize: 8
      }
    }
    pdfMake.createPdf(dd).open();
  }
}
