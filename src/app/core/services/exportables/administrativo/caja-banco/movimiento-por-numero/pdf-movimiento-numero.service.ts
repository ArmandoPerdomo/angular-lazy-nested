import {
  Injectable
} from '@angular/core';
import {
  ExportService,
  imagenconstr
} from '../../../parent/export.service';
import {
  RepAdmFormatoMovBancoOut
} from '../../../../../../abstract/DTO/out/reportesAdmCajaBlanco/repAdmMovBanco/repAdmMovBancoOut';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable()
export class PdfMovimientoNumeroService extends ExportService {

  constructor() {
    super();
  }

  buildTableBody(data) {

    var body = [];
    var self = this;
    var pageBreak = {
      text: '',
      pageBreak: 'before'
    };
    let a = 0;
    data.forEach(el => {
      a= +a+ 1;
      var title = [{
          text: 'DATOS GENERALES',
          bold: 'true',
          colSpan: 4,
          alignment: 'center',
        },
        {}, {}, {}
      ];


      let objectTabla = {
        table: {
          headerRows: 1,
          widths: [95, 165, 90, 160],
          body: [

          ]
        }
      };

      var row1 = [];
      var row2 = [];
      var row3 = [];

      row1.push('Cuenta');
      row1.push(el['Cuenta']);
      row1.push('Moneda');
      row1.push(el['Moneda']);

      row2.push('Fecha de Emisión');
      row2.push(self.transformDateTable(el['FechaEmision']));
      row2.push('Cuenta Ingreso');
      row2.push(el['CtaIng']);

      row3.push('Número');
      row3.push(el['Numero']);
      row3.push('Concepto');
      row3.push(el['Concepto']);


      // TABLA DE TIPO DE MOVIMIENTOS
      var title2 = [{
          text: 'TIPO DE MOVIMIENTO',
          bold: 'true',
          colSpan: 4,
          alignment: 'center',
        },
        {}, {}, {}
      ];


      let objectTabla2 = {
        table: {
          headerRows: 1,
          widths: [95, 165, 90, 160],
          body: [

          ],

        }
      };
      var row21 = [];
      var row22 = [];
      var row23 = [];

      row21.push('Origen');
      row21.push(el['Origen']);
      row21.push('Num. Doc.');
      row21.push(el['NumDoc']);

      row22.push('Tipo de Movimiento');
      row22.push(el['TipoMov']);
      row22.push('Número');
      row22.push(el['Numero']);

      row23.push('Monto');
      row23.push(self.moneyTrans(el['Monto']));
      row23.push('Banco');
      row23.push(el['Banco']);

      objectTabla2.table.body.push(title2);
      objectTabla2.table.body.push(row21);
      objectTabla2.table.body.push(row22);
      objectTabla2.table.body.push(row23);


      objectTabla.table.body.push(title);
      objectTabla.table.body.push(row1);
      objectTabla.table.body.push(row2);
      objectTabla.table.body.push(row3);



      body.push(objectTabla);
      body.push('\n\n');
      body.push(objectTabla2);
      body.push('\n\n');

      if( a != data.length)
        body.push(pageBreak);

      //  {text: 'Headers', , style: 'subheader'},

    });

    return body;
  }

  public pdfMBancoxNumero(rout: RepAdmFormatoMovBancoOut) {
    var self = this;
    var dd = {
      info:{
        title: 'Movimientos de banco por número'
      },
      header: function (currentPage, pageCount) { /*Tabla del header*/
        return {
          table: {
            widths: ['20%', '55%', '25%'],
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
                  alignment: 'center', fontSize: 12,
                },
                { //Detalles
                  columns: [
                    [ //Fila
                      '\n\n',
                      {
                        text: 'Fecha:  ',
                        bold: true
                      },
                      {
                        text: 'Número:  ',
                        bold: true
                      },
                    ],
                    [
                      '\n\n',
                      self.currentDate[1] + ' ' + self.currentDate[2] + self.currentDate[3],
                      currentPage.toString() + '/' + pageCount.toString() //Implement new Date
                    ]
                  ],
                  alignment: 'left',fontSize: 10,
                }
              ], //Fin Primera Fila
              [ //Segunda fila
                {
                  text: 'COMPROBANTE DE EGRESO DE BANCO',
                  fontSize: 18,
                  style: 'header',
                  colSpan: 3,
                  alignment: 'center'
                }, {}, {}
              ], //Fin Segunda Fila


            ]
          },
          layout: 'noBorders',
          style: 'headerTable'
        }
      },

      footer: function (currentPage, pageCount) {
        return {
          table: {
            widths: ['20%', '25%', '25%', '25%'],
            heights: [10, 15, 15, 15],
            body: [
              [{
                  text: '',
                  border: [false, true, false, false]
                },
                {
                  text: '',
                  border: [false, true, false, false]
                },
                {
                  text: '',
                  border: [false, true, false, false]
                },
                {
                  text: '',
                  border: [false, true, false, false]
                },
              ],
              [{
                  text: 'APROBADO',
                  alignment: 'center',
                  border: [false, false, false, false]
                },
                {
                  text: 'CONTABILIZADO',
                  alignment: 'center',
                  border: [false, false, false, false]
                },
                {
                  text: 'COMPROBANTE',
                  alignment: 'center',
                  border: [false, false, false, false]
                },
                {
                  text: 'CUENTA DE EGRESO',
                  alignment: 'center',
                  border: [false, false, false, false]
                },
              ],
              [
                '\n\n\n', '\n\n', '\n\n', '\n\n'
              ],

            ]
          },

          style: 'footerTable'
        }

      },

      content: [


        // tabla DATOS GENERALES
        self.buildTableBody(rout.RepFormatoMovBancoResult.Documeto),
        {
          text: '\n\n'
        },
        // FIN tabla DATOS GENERALES

      ],
      styles: {
        headerTable: {
          margin: [5, 10, 10, 8]
        },
        header: {
          bold: true,
          alignment: 'justify'
        },
        footerTable: {
          margin: [29, 10, 10, 8]
        }

      },

      pageSize: 'LETTER',

      pageMargins: [30, 140, 10, 150], //Content margins
      defaultStyle: {
        fontSize: 10
      }

    }

    pdfMake.createPdf(dd).open();
  }
}
