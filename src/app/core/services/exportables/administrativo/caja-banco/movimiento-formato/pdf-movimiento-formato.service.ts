import {
  Injectable
} from '@angular/core';
import {
  ExportService,
  imagenconstr
} from '../../../parent/export.service';
import {
  RepAdmMovBancoxNumeroOut
} from '../../../../../../abstract/DTO/out/reportesAdmCajaBlanco/repAdmMovBancoxNumero/repAdmMovBancoxNumeroOut';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable()
export class PdfMovimientoFormatoService extends ExportService {

  constructor() {
    super();
  }

  public pdfMovimientoFormatoDigital(rout: RepAdmMovBancoxNumeroOut) {
    var self = this;
    var dd = {
      info:{
        title: 'Movimiento de banco formato digital'
      },
      header: function (currentPage, pageCount) {
        return {
          table: {
            widths: ['20%', '49%', '30%'],
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
                        bold: true
                      },
                      {
                        text: 'Hora:  ',
                        bold: true
                      },
                      {
                        text: 'Página:  ',
                        bold: true
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
                  text: 'Movimiento de Banco: Formato Digital (Órden: Fecha)',
                  style: 'header',
                  colSpan: 3,
                  alignment: 'center'
                }, {}, {}
              ], //Fin Segunda Fila
              [ //Tercera fila
                {
                  text: 'Consulta de Movimiento número: 0.',
                  fontSize: 15,
                  colSpan: 3,
                  alignment: 'center'
                }, {}, {}
              ], //Fin Tercera Fila
              [ //5ta fila
                {
                  style: 'tableExample',
                  table: {
                    widths: [32, 58, 53, 23, 50, 33, 80, 30, 43, 50, 47],
                    body: [
                      [{
                          text: 'Número',
                          style: 'hTable',
                          border: [false, true, false, true],
                        },
                        {
                          text: 'Cuenta',
                          style: 'hTable',
                          border: [false, true, false, true],
                        },
                        {
                          text: 'Fecha',
                          style: 'hMTable',
                          border: [false, true, false, true],
                        },
                        {
                          text: 'Tipo',
                          style: 'hMTable',
                          border: [false, true, false, true],
                        },
                        {
                          text: 'Nro. Doc',
                          style: 'hMTable',
                          border: [false, true, false, true],
                        },
                        {
                          text: 'Mon',
                          style: 'hMTable',
                          border: [false, true, false, true],
                        },
                        {
                          text: 'Descripción',
                          style: 'hMTable',
                          border: [false, true, false, true],
                        },
                        {
                          text: 'Origen',
                          style: 'hMTable',
                          border: [false, true, false, true],
                        },
                        {
                          text: 'Debe',
                          style: 'hMTable',
                          alignment: 'right',
                          border: [false, true, false, true],
                        },
                        {
                          text: 'Haber',
                          style: 'hMTable',
                          alignment: 'right',
                          border: [false, true, false, true],
                        },
                        {
                          text: 'ITF',
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
      content: [{
          table: {
            widths: [27, 53, 45, 14, 44, 28, 74, 23, 40, 44, 44],
            body: this.buildTableBodyBest(rout.RepMovBancoxNumeroResult.Documeto,
              ['Numero', 'Cuenta', 'Fecha', 'Tpo', 'NroDoc', 'Moneda', 'Descripcion', 'Origen', 'Debe', 'Haber', 'ITF'],
              ['', '', '', '', '', '', '', '', '', '', '']),
          },
          layout: 'lightHorizontalLines'
        },
        // fin Body
        //Footer
        {
          style: 'tableExample',
          table: {
            widths: [35, 60, 60, 14, 44, 28, 74, 45, 44, 48, 44],
            body: [
              [{
                  text: '',
                  border: [false, false, false, false],
                },
                {
                  text: '',
                  border: [false, false, false, false],
                },
                {
                  text: '',
                  border: [false, false, false, false],
                },
                {
                  text: '',
                  border: [false, false, false, false],
                },
                {
                  text: '',
                  border: [false, false, false, false],
                },
                {
                  text: '',
                  border: [false, false, false, false],
                },
                {
                  text: '',
                  border: [false, false, false, false],
                },
                {
                  text: 'TOTALES:',
                  alignment: 'right',
                  bold: 'true',
                  border: [false, true, false, false],
                },
                {
                  text: self.moneyTrans(rout.RepMovBancoxNumeroResult.TotalDebe.toString()),
                  bold: 'true',  alignment: 'right',
                  border: [false, true, false, false],
                },
                {
                  text: self.moneyTrans(rout.RepMovBancoxNumeroResult.TotalHaber.toString()),
                  bold: 'true',  alignment: 'right',
                  border: [false, true, false, false],
                },
                {
                  text: self.moneyTrans(rout.RepMovBancoxNumeroResult.TotalITF.toString()),
                  bold: 'true',  alignment: 'right',
                  border: [false, true, false, false],
                },

              ],

            ]
          },
        },
        // fin Footer
      ],
      styles: {
        hMTable: {
          bold: true,
          alignment: 'left'
        },
        hTable: {
          bold: true,
          alignment: 'left'
        },
        bMTable: {
          alignment: 'right',
        },
        bTable: {
          alignment: 'justify'
        },
        headerTable: {
          margin: [5, 10, 10, 8]
        },
        tableHeader2: {
          bold: true,
          alignment: 'right'
        },
        tableHeader: {
          bold: true,
        },
        header: {
          bold: true,
          alignment: 'justify'
        }
      },
      pageSize: 'LEGAL',
      pageMargins: [6, 160, 10, 20],
      defaultStyle: {
        fontSize: 8
      }
    }
    pdfMake.createPdf(dd).open();

  }
}
