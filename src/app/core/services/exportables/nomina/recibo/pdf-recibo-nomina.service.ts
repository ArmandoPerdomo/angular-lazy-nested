import { Injectable } from '@angular/core';
import { ExportService, imagenconstr } from '../../parent/export.service';
import { RepNomReciboPagoOut } from '../../../../../abstract/DTO/out/reportesNomina/repNomReciboPago/repNomReciboPagoOut';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable()
export class pdfReciboNominaService extends ExportService {

  constructor() {
    super();
  }

  buildTableBodyBestRecibo(data, key, columns) {
    var body = [];
    var self = this;
    //?Agregar acá las key necesarias para las columnas que requieran formato de cantidad/monto.
    let a = ['Asignaciones', 'Deducciones']

    body.push(columns);

    data.forEach(function (row) {
      var dataRow = [];
      key.forEach(function (key) {
        if (key == 'Neto') {
          dataRow.push({
            text: self.moneyTrans(row['Asignaciones'] - row['Deducciones']),
            alignment: 'right'
          });
        } else if (a.includes(key)) {
          dataRow.push({
            text: self.moneyTrans(row[key]),
            alignment: 'right'
          });
        } else if (key == 'Valor_Aux') {
          dataRow.push({
            text: self.moneyTrans(row[key]) + ' día(s)',
            alignment: 'right'
          });
        } else {
          dataRow.push(row[key]);
        }
      })
      body.push(dataRow);
    });
    return body;
  }

  public pdfReciboNomina(rout: RepNomReciboPagoOut) {
    var self = this;
    var asig = self.sumarMontoRenglones(rout.RepReciboPagoResult.Recibos[0].Registro, 'Asignaciones');
    var dedu = self.sumarMontoRenglones(rout.RepReciboPagoResult.Recibos[0].Registro, 'Deducciones');
    var neto = +asig - +dedu;
    var dd = {
      info: {
        title: 'Recibo de pago'
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
                  fontSize: 12
                },
                { //Detalles
                  columns: [
                    [ //Fila
                      '\n\n',
                      'Fecha:',
                      'Hora:',
                      'Página:',

                    ],
                    [
                      '\n\n',
                      self.currentDate[0],
                      self.currentDate[1] + ' ' + self.currentDate[2] + self.currentDate[3],
                      currentPage.toString() + '/' + pageCount.toString() //Implement new Date
                    ]
                  ],
                  alignment: 'left'
                }
              ], //Fin Primera Fila
              [ //Segunda fila
                {
                  text: 'RECIBO DE PAGO',
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
      content: [
        [ //4ta fila
          {
            style: 'tableExample',
            table: {
              headerRows: 1,
              widths: [60, 70, 60, 70, 50, 70, 60, 70],
              body: [
                [{
                    text: 'Trabajador:',
                    bold: 'true'
                  },
                  {
                    text: rout.RepReciboPagoResult.Recibos[0].SApellido.toString(),
                    colSpan: 3
                  },
                  {},
                  {},
                  {
                    text: 'Cedula:',
                    bold: 'true'
                  },
                  {
                    text: rout.RepReciboPagoResult.Recibos[0].CI.toString()
                  },
                  {
                    text: 'Fecha Ingreso:',
                    bold: 'true'
                  },
                  {
                    text: self.transformDateTable(rout.RepReciboPagoResult.Recibos[0].Fecha_Ingreso)
                  },
                ],
                [{
                    text: 'Saldo Mensual:',
                    bold: 'true'
                  },
                  {
                    text: self.moneyTrans(rout.RepReciboPagoResult.Recibos[0].Sueldo_Men)
                  },
                  {
                    text: 'Departamento:',
                    bold: 'true'
                  },
                  {
                    text: rout.RepReciboPagoResult.Recibos[0].Departamento.toString()
                  },
                  {
                    text: 'Cargo:',
                    bold: 'true'
                  },
                  {
                    text: rout.RepReciboPagoResult.Recibos[0].Cargo.Descripcion.toString(),
                    colSpan: 3
                  },
                  {},
                  {}
                ],
                [{
                    text: 'Periodo desde:',
                    bold: 'true'
                  },
                  {
                    text: self.transformDateTable(rout.RepReciboPagoResult.Recibos[0].Periodo_D)
                  },
                  {
                    text: 'Perido hasta:',
                    bold: 'true'
                  },
                  {
                    text: self.transformDateTable(rout.RepReciboPagoResult.Recibos[0].Periodo_H)
                  },
                  {
                    text: 'Recibo:',
                    bold: 'true'
                  },
                  {
                    text: rout.RepReciboPagoResult.Recibos[0].N_Recibo
                  },
                  {
                    text: 'Fecha:',
                    bold: 'true'
                  },
                  {
                    text: self.transformDateTable(rout.RepReciboPagoResult.Recibos[0].Periodo_H)
                  }
                ],
              ]
            },
            colSpan: 3,
            layout: 'noBorders',
            margin: [5, 0, 0, 0]
          }, {}, {}
        ], //Fin 4ta Fila
        {
          text: '\n'
        },
        // Tabla de detalle 
        // contenido
        {
          style: 'tableExample',
          table: {
            widths: [50, 150, 50, 70, 70, 70],
            body: self.buildTableBodyBestRecibo(rout.RepReciboPagoResult.Recibos[0].Registro,
              ['Codigo', 'Descripcion', 'Valor_Aux', 'Asignaciones', 'Deducciones', 'Neto'],
              ['Código', 'Descripción', 'Valor Auxiliar', 'Asignaciones', 'Deducciones', 'Neto a cobrar']),
          },
          layout: 'lightHorizontalLines',
          margin: [5, 0, 0, 0]
        },
        // FIN contenido
        //Footer
        {
          table: {
            widths: [70, 120, 72, 75, 75, 75],
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
                  text: 'Total trabajador:',
                  style: 'hTable',
                  border: [false, true, false, false],
                },
                {
                  text: self.moneyTrans(asig),
                  style: 'hTable',
                  border: [false, true, false, false],
                },
                {
                  text: self.moneyTrans(dedu),
                  style: 'hTable',
                  border: [false, true, false, false],
                },
                {
                  text: self.moneyTrans(neto),
                  style: 'hTable',
                  border: [false, true, false, false],
                }
              ],
              [{
                  text: '',
                  border: [false, true, false, false],
                },
                {
                  text: '',
                  border: [false, true, false, false],
                },
                {
                  text: 'Banco:',
                  border: [false, true, false, false],
                },
                {
                  text: '',
                  border: [false, true, false, false],
                },
                {
                  text: '',
                  border: [false, true, false, false],
                },
                {
                  text: '',
                  border: [false, true, false, false],
                }
              ],
              [{
                  text: 'Recibí conforme:',
                  border: [false, true, false, false],
                },
                {
                  text: '',
                  border: [false, true, false, false],
                },
                {
                  text: 'Cuenta:',
                  border: [false, true, false, false],
                },
                {
                  text: '',
                  border: [false, true, false, false],
                },
                {
                  text: '',
                  border: [false, true, false, false],
                },
                {
                  text: '',
                  border: [false, true, false, false],
                }
              ],

            ]
          },
          margin: [5, 0, 0, 0]
        },
        // fin Footer
        // FIN TABLA de detalle
      ],
      styles: {
        hTable: {
          alignment: 'right'
        },
        bMTable: {
          alignment: 'right'
        },
        bTable: {
          alignment: 'justify'
        },
        headerTable: {
          margin: [5, 10, 10, 8]
        },
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'justify'
        }
      },
      pageSize: 'LEGAL',
      pageMargins: [30, 100, 10, 20], //Content margins
      defaultStyle: {
        fontSize: 8
      }
    }
    pdfMake.createPdf(dd).open();
  }
}
