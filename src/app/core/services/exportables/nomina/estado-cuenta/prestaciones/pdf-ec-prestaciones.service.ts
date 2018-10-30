import { Injectable } from '@angular/core';
import { ExportService, imagenconstr } from '../../../parent/export.service';
import { RepNomEstCuentaPrestacionesOut } from '../../../../../../abstract/DTO/out/reportesNomina/repNomEstCuentaPrestaciones/repNomEstCuentaPrestacionesOut';
import { RepNomEstCuentaPrestacionesIn } from '../../../../../../abstract/DTO/in/reportesNomina/repNomEstCuentaPrestacionesIn';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable()
export class PdfEcPrestacionesService extends ExportService {

  constructor() {
    super();
  }

  buildBody(data) {
    var body = []
    var pageBreak = {
      text: '',
      pageBreak: 'before'
    };
    var a = 0;
    data.forEach(el => {
      a = +a + +1;
      var objtabla1 = {
        table: {
          body: []
        },
        layout: 'noBorders'
      };
      var row1 = [];

      row1.push({
        text: 'Código:',
        bold: 'true'
      });
      row1.push(el['Co_Empleado']);
      row1.push({
        text: 'Nombres:',
        bold: 'true'
      });
      row1.push(el['SNombre']);
      row1.push({
        text: 'Cédula:',
        bold: 'true'
      });
      row1.push(el['CI']);
      row1.push({
        text: 'Fecha Ingreso:',
        bold: 'true'
      });
      row1.push(this.transformDateTable(el['Fecha_Ingreso']));

      objtabla1.table.body.push(row1);

      var objtabla2 = {
        table: {
          widths: [45, 43, 59, 60, 59, 58, 58],
          body: [],
        },
        layout: 'noBorders'
      };
      var row21 = [];
      var row22 = [];

      row21.push({
        rowSpan: 2,
        text: 'Acumulados\nIniciales:',
        bold: 'true'
      });
      row21.push({
        text: 'N° de días',
        bold: 'true',
        alignment: 'right'
      });
      row21.push({
        text: 'Prest. Sociales',
        bold: 'true',
        alignment: 'right'
      });
      row21.push({
        text: 'Días Adicionales',
        bold: 'true',
        alignment: 'right'
      });
      row21.push({
        text: 'Anticipos Prest.',
        bold: 'true',
        alignment: 'right'
      });
      row21.push({
        text: 'Intereses Prest.',
        bold: 'true',
        alignment: 'right'
      });
      row21.push({
        text: 'Intereses Canc.',
        bold: 'true',
        alignment: 'right'
      });
      row22.push('');
      row22.push({
        text: this.moneyTrans(el.Acumulados_Iniciales['Num_Dia']),
        alignment: 'right'
      });
      row22.push({
        text: this.moneyTrans(el.Acumulados_Iniciales['Prest_Sociales']),
        alignment: 'right'
      });
      row22.push({
        text: this.moneyTrans(el.Acumulados_Iniciales['Dias_Adic']),
        alignment: 'right'
      });
      row22.push({
        text: this.moneyTrans(el.Acumulados_Iniciales['Anticipos_Prest']),
        alignment: 'right'
      });
      row22.push({
        text: this.moneyTrans(el.Acumulados_Iniciales['Intereses_Prest']),
        alignment: 'right'
      });
      row22.push({
        text: this.moneyTrans(el.Acumulados_Iniciales['Intereses_Canc']),
        alignment: 'right'
      });

      objtabla2.table.body.push(row21);
      objtabla2.table.body.push(row22);

      var objtabla3 = {
        table: {
          widths: [25, 57, 45, 44, 44, 44, 27, 57, 27, 34, 35, 55, 50, 45, 45, 45, 50],
          body: this.buildTablePrestaciones(el.Registro,
            ['Fecha', 'Salario', 'Diario_Basico', 'Alic_Utilidad', 'Alic_Abono', 'Integral_Diario', 'Dias_Abono', 'Monto_Abono', 'Dias_Adic', 'Monto_Dias_Adic',
              'Anticipos_Prest_Soc', 'Acumulado_Prest', 'Capital_Intereses', 'Tasa_intereses', 'Monto_Intereses', 'Intereses_Cancelados', 'Acumulado_Intereses'
            ],
            ['Fecha', 'Salario', 'Diario Básico', 'Alic Utilidad', 'Alic Abono', 'Integral Diario', 'Días Abon', 'Monto \nAbono', 'Días Adic', 'Monto días Adic',
              'Anticipos Prest', 'Acum Prestaciones', 'Capital Intereses', 'Tasa Intereses', 'Monto Interes', 'Interes \nCancelado', 'Acum Intereses'
            ]),
        },
        layout: 'lightHorizontalLines',
        alignment: 'center'
      };

      var objtabla4 = {
        table: {
          widths: [25, 57, 45, 44, 44, 44, 27, 57, 27, 43, 34, 50, 50, 45, 44, 44, 50],
          body: [
            [{},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {}
            ],
            [{
                text: "TOTAL POR TRABAJADOR",
                colSpan: 3,
                alignment: 'right',
                bold: 'true'
              },
              {},
              {},
              {
                text: ""
              },
              {
                text: ""
              },
              {
                text: ""
              },
              {
                text: this.moneyTrans(el.Dias_abon_total),
                alignment: 'center',
                bold: 'true'
              },
              {
                text: this.moneyTrans(el.Monto_abon_total),
                alignment: 'center',
                bold: 'true'
              },
              {
                text: this.moneyTrans(el.Dias_adic_total),
                alignment: 'center',
                bold: 'true'
              },
              {
                text: this.moneyTrans(el.Monto_dias_adicionales_total),
                alignment: 'center',
                bold: 'true'
              },
              {
                text: ""
              },
              {
                text: ""
              },
              {
                text: ""
              },
              {
                text: ""
              },
              {
                text: this.moneyTrans(el.Monto_interes_total),
                alignment: 'center',
                bold: 'true'
              },
              {
                text: ""
              },
              {
                text: this.moneyTrans(el.Acumulado_interese_total),
                alignment: 'center',
                bold: 'true'
              },

            ]
          ]
        },
        layout: 'lightHorizontalLines'
      };
      body.push(objtabla1);
      body.push('\n\n');
      body.push(objtabla2);
      body.push('\n\n');
      body.push(objtabla3);
      body.push(objtabla4);

      if (a != data.length)
        body.push(pageBreak);
    });
    return body;
  }

  public pdfEdoCuentaPrestaciones(dc: RepNomEstCuentaPrestacionesOut, din: RepNomEstCuentaPrestacionesIn) {
    var self = this;
    var dd = {
      info: {
        title: 'Control de prestaciones'
      },
      header: function (currentPage, pageCount) { /*Tabla del header*/
        return {
          table: {
            widths: ['25%', '50%', '25%'],
            heights: ['auto', 'auto', 'auto'],
            body: [
              [ //Primera fila
                { //Imagen
                  image: imagenconstr,
                  width: 140,
                  height: 80
                },
                { //Membrete
                  text: '\n\nAv. Los Pinos, entre calle Pomagas y Los Mangos,Casa Nro. 35 Urb. La Florida Norte, Zona Portal 1050 Ofi. +58212731.2087',
                  fontSize: 12,
                  alignment: 'center'
                },
                { //Detalles
                  columns: [
                    [ //Fila
                      '\n\nFecha de Emisión:',
                      'Hora de Emisión:',
                      'Página:'
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
              ],
              [ //Segunda fila
                { //Titulo
                  text: 'Estado de cuenta de prestaciones',
                  style: 'header',
                  colSpan: 3,
                  aligment: 'center'
                },
                {},
                {}
              ], //fin segunda fila
              [ //Tercera fila
                {
                  style: 'tableExample',
                  table: {
                    headerRows: 1,
                    body: [
                      [{
                          text: 'Fecha: ',
                          style: 'tableHeader'
                        },
                        {
                          text: 'Desde ',
                          style: 'tableHeader'
                        },
                        self.transform(din.Fecha_D),
                        {
                          text: 'Hasta',
                          style: 'tableHeader'
                        },
                        self.transform(din.Fecha_h),
                      ]
                    ]
                  },
                  colSpan: 3,
                  alignment: 'center',
                  layout: 'noBorders',
                  margin: [400, 0, 0, 0]
                },
                {},
                {}
              ] //fin Tercera fila
            ]
          },
          layout: 'noBorders',
          style: 'headerTable'
        }
      },
      content: [
        self.buildBody(dc.RepEstadoCuentasPrestacionesResult.Prestaciones),
      ],
      styles: {
        headerTable: {
          margin: [10, 10, 10, 0]
        },
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center'
        }
      },
      pageOrientation: 'landscape',
      pageSize: 'LEGAL',
      pageMargins: [13, 150, 100, 4], //Content margins
      defaultStyle: {
        fontSize: 8
      }
    }
    pdfMake.createPdf(dd).open();
  }

  buildTablePrestaciones(data, key, columns) {
    var body = [];
    let a = ['Salario', 'Diario_Basico', 'Alic_Utilidad', 'Alic_Abono', 'Integral_Diario', 'Dias_Abono', 'Monto_Abono', 'Dias_Adic', 'Monto_Dias_Adic',
      'Anticipos_Prest_Soc', 'Acumulado_Prest', 'Capital_Intereses', 'Tasa_intereses', 'Monto_Intereses', 'Intereses_Cancelados', 'Acumulado_Intereses'
    ];
    var self = this;
    body.push(columns);
    data.forEach(function (row) {
      var dataRow = [];
      key.forEach(function (key) {
        if (a.includes(key))
          dataRow.push({
            text: self.moneyTrans(row[key]),
            alignment: 'center'
          });
        else
          dataRow.push(row[key]);
      })
      body.push(dataRow);
    });
    return body;
  }
}
