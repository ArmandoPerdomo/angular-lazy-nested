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
export class PdfDisponibilidadCajaService extends ExportService {

  constructor() {
    super();
  }

  buildTableCajaBancoDisponibilidad(data, key) {
    var body = [];
    var self = this;
    var totalD = 0;
    var totalH = 0;
    data.forEach(function (row) {
      var subody = [];
      var otroarr = [];
      subody.push(row['name']);
      var content = [];
      var subcontent = [];
      var object = {
        table: {
          headerRows: 1,
          widths: [100, 240, 90, 85],
          body: []
        }
      };
      totalD += +row.Disponibilidad[0].Monto_D;
      totalH += +row.Disponibilidad[0].Monto_H;
      row['Disponibilidad'].forEach(element => {
        var subdata = [];
        key.forEach(function (key) {
          if (key == 'Monto_D' || key == 'Monto_H')
            subdata.push({text: self.moneyTrans(element[key]), alignment: "right"});
          else
            subdata.push(element[key]);
        });
        object.table.body.push(subdata);
      });
      subcontent.push(object);
      content.push(subcontent);
      otroarr.push(content);
      body.push(subody);
      body.push(otroarr);
    });
    body.push([{text: 'Total de Egreso: ' + self.moneyTrans(totalD), alignment: "right"}]);
    body.push([{text: 'Total Disponibilidad: ' + self.moneyTrans(totalH), alignment: "right"}]);
    return body;
  }

  public pdfDisponibilidad(rout: any) {
    var self = this;
    var dd = {
      info : {
        title: 'Disponibilida flujo caja'
      },
      header: function (currentPage, pageCount) { /*Tabla del header*/
        return {
          table: {
            widths: ['20%', '53%', '30%'],
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
                      currentPage.toString() + '/' + pageCount.toString()
                    ]
                  ],
                  alignment: 'left'
                }
              ], //Fin Primera Fila
              [ //Segunda fila
                {
                  text: 'DOCUMENTO DE DISPONIBILIDAD (Orden: Código)',
                  style: 'header',
                  colSpan: 3,
                  alignment: 'center'
                }, {}, {}
              ], //Fin Segunda Fila
              [ //5ta fila
                {
                  style: 'tableExample',
                  table: {
                    widths: [100, 240, 90, 85],
                    body: [
                      [{
                          text: '',
                          bold: true,
                          border: [false, true, false, true],
                        },
                        {
                          text: 'Banco',
                          bold: true,
                          border: [false, true, false, true],
                        },
                        {
                          text: 'Monto en Otra moneda ',
                          bold: true,
                          alignment: 'right',
                          border: [false, true, false, true],
                        },
                        {
                          text: 'Monto',
                          bold: true,
                          alignment: 'right',
                          border: [false, true, false, true],
                        }
                      ],
                    ]
                  },
                  colSpan: 3,

                }, {}, {}
              ] //Fin 5ta Fila
            ]
          },
          layout: 'noBorders',
          style: 'headerTable'
        }
      },
      content: [{
        style: 'tableExample',
        table: {
          body: this.buildTableCajaBancoDisponibilidad(rout, ['Co_Caja', 'Descrip', 'Monto_D', 'Monto_H']),
        },
        layout: 'lightHorizontalLines',
        margin: [5, 0, 0, 0]
      }],
      styles: {
        headerTable: {
          margin: [32, 10, 10, 8]
        },
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'justify'
        }
      },
      pageSize: 'LEGAL',
      pageMargins: [30, 140, 10, 20], //Content margins
      defaultStyle: {
        fontSize: 8
      }
    }
    pdfMake.createPdf(dd).open();
  }
}
