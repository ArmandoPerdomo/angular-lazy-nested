import {Injectable} from '@angular/core';
import {ExportService, imagenconstr} from '../../../parent/export.service';
import { RepNomEdoCtaUtilidadesOut } from '../../../../../../abstract/DTO/out/reportesNomina/repNomEdoCtaUtilidades/repNomEdoCtaUtilidadesOut';
import { RepNomEdoCtaUtilidadesIn } from '../../../../../../abstract/DTO/in/reportesNomina/repNomEdoCtaUtilidadesIn';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable()
export class PdfEcUtilidadesService extends ExportService {

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
      let jan= 0, feb= 0, mar= 0, apr= 0, may= 0, jun= 0, jul= 0, aug= 0, sep= 0, oct= 0, nov= 0, dec= 0, tot = 0;
      el.DetalleConcepto.forEach(b => {
        jan = +jan + +b.Enero;
        feb = +feb + +b.Febrero;
        mar = +mar + +b.Marzo;
        apr = +apr + +b.Abril;
        may = +may + +b.Mayo;
        jun = +jun + +b.Junio;
        jul = +jul + +b.Julio;
        aug = +aug + +b.Agosto;
        sep = +sep + +b.Septiembre;
        oct = +oct + +b.Octubre;
        nov = +nov + +b.Novimbre;
        dec = +dec + +b.Diciembre;
        tot = +tot + +b.Total;        
      });
      a = +a + +1;
      var objtabla1 = {
        table: {
          widths: [73, 200],
          body: [
            [{
                text: 'Trabajador:',
                bold: 'true'
              },
              {
                text: el['CodigoTrabajador'] + el['Trabajador']
              },
            ],
            [{
                text: 'Departamento',
                bold: 'true'
              },
              {
                text: el['Departamento']
              },
            ],
            [{
                text: 'Fecha de ingreso',
                bold: 'true'
              },
              {
                text: el['FechaIngreso']
              },
            ],
          ]
        },
        layout: 'noBorders'
      };

      var objtabla2 = {
        table: {
          widths: [75, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 60],
          body: this.buildTableUtilidades(el.DetalleConcepto,
            ['Concepto', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 
            'Septiembre', 'Octubre', 'Novimbre', 'Diciembre', 'Total']),
        },
        layout: 'lightHorizontalLines'
      };

      var objtabla3 = {
        table: {
          widths: [75, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 60],
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
              {}
            ],
            [{
                text: 'Totales trabajador:',
                alignment: 'left',
                bold: 'true'
              },
              {
                text: this.moneyTrans(jan),
                alignment: 'right',
                bold: 'true'
              },
              {
                text: this.moneyTrans(feb),
                alignment: 'right',
                bold: 'true'
              },
              {
                text: this.moneyTrans(mar),
                alignment: 'right',
                bold: 'true'
              },
              {
                text: this.moneyTrans(apr),
                alignment: 'right',
                bold: 'true'
              },
              {
                text: this.moneyTrans(may),
                alignment: 'right',
                bold: 'true'
              },
              {
                text: this.moneyTrans(jun),
                alignment: 'right',
                bold: 'true'
              },
              {
                text: this.moneyTrans(jul),
                alignment: 'right',
                bold: 'true'
              },
              {
                text: this.moneyTrans(aug),
                alignment: 'right',
                bold: 'true'
              },
              {
                text: this.moneyTrans(sep),
                alignment: 'right',
                bold: 'true'
              },
              {
                text: this.moneyTrans(oct),
                alignment: 'right',
                bold: 'true'
              },
              {
                text: this.moneyTrans(nov),
                alignment: 'right',
                bold: 'true'
              },
              {
                text: this.moneyTrans(dec),
                alignment: 'right',
                bold: 'true'
              },
              {
                text: this.moneyTrans(tot),
                alignment: 'right',
                bold: 'true'
              },
            ]
          ]
        },
        layout: 'lightHorizontalLines'
      };

      var objtabla4 = {
        table: {
          widths: [75, 60],
          body: [
            [
              {
                text: 'Total general:',
                bold: 'true'
              },
              {
                text: this.moneyTrans(el['TotalGeneral']),
                alignment: 'right'
              },
            ]
          ]        
        },
        layout: 'noBorders'
      }

      body.push(objtabla1, '\n\n', objtabla2, objtabla3, '\n\n', objtabla4);

      if (a != data.length)
        body.push(pageBreak);
    });
    return body;
  }

  public pdfEdoCuentaUtilidades(dout: RepNomEdoCtaUtilidadesOut, din: RepNomEdoCtaUtilidadesIn) {
    var self = this;
    var dd = {
      info: {
        title: 'Control de utilidades'
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
                  alignment: 'center',
                  fontSize: 12
                },
                { //Detalles
                  columns: [
                    [ //Fila
                      '\n\n',
                      {
                        text: 'Fecha:',
                        bold: 'true'
                      },
                      {
                        text: 'Hora:',
                        bold: 'true'
                      },  
                      {
                        text: 'Página:',
                        bold: 'true'
                      },
                    ],
                    [
                      '\n\n',
                      self.currentDate[0],
                      self.currentDate[1] + ' ' + self.currentDate[2] + self.currentDate[3],
                      currentPage.toString() + '/' + pageCount.toString() //Implement new Date
                    ]
                  ],
                  alignment: 'left',
                  margin: [100, 5, 5, 5]
                }
              ], //Fin Primera Fila
              [ //Segunda fila
                {
                  text: 'RESUMEN ANUAL DEVENGADO UTILIDADES POR TRABAJADOR',
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
                          text: 'Trabajador:',
                          style: 'tableHeader2'
                        }, ' Desde:', '', 'Hasta:', '',
                        {
                          text: 'Fecha:',
                          style: 'tableHeader2'
                        },
                        'Desde:',
                        self.transform(din.Fecha_D),
                        'Hasta:',
                        self.transform(din.Fecha_H),
                      ],
                    ]
                  },
                  colSpan: 3,
                  alignment: 'center',
                  layout: 'noBorders',
                  margin: [320, 0, 0, 0]
                }, {}, {}
              ], //Fin Tercera Fila
            ]
          },
          layout: 'noBorders',
          style: 'headerTable'
        }
      },
      content: [
        self.buildBody(dout.RepEdoCtaUtilidadesResult.ResumenUtilidades),
      ],
      styles: {
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
      pageOrientation: 'landscape',
      pageMargins: [20, 140, 10, 20], //Content margins
      defaultStyle: {
        fontSize: 8
      }
    }
    pdfMake.createPdf(dd).open();
  }

  buildTableUtilidades(data, key) {
    var body = [];
    var a = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 
      'Agosto', 'Septiembre', 'Octubre', 'Novimbre', 'Diciembre', 'Total'];
    var columns =  [
      {text:'Concepto', bold: 'true', alignment: 'left'}, 
      {text:'Enero',  bold: 'true', alignment: 'right'},
      {text:'Febrero',  bold: 'true', alignment: 'right'},
      {text:'Marzo',  bold: 'true', alignment: 'right'},
      {text:'Abril',  bold: 'true', alignment: 'right'},
      {text:'Mayo',  bold: 'true', alignment: 'right'},
      {text:'Junio',  bold: 'true', alignment: 'right'},
      {text:'Julio', bold: 'true', alignment: 'right'},
      {text:'Agosto', bold: 'true', alignment: 'right'},
      {text:'Septiembre',  bold: 'true', alignment: 'right'},
      {text:'Octubre',  bold: 'true', alignment: 'right'},
      {text:'Noviembre',  bold: 'true', alignment: 'right'},
      {text:'Diciembre',  bold: 'true', alignment: 'right'},
      {text:'Total', bold: 'true', alignment: 'right'}];
    var self = this;
    body.push(columns);
    data.forEach(function (row) {
      var dataRow = [];
      var pag = "";
      if (row['Pagado'])
        pag = 'Sí';
      else
        pag = 'No';
      key.forEach(function (key) {
        if (key == 'Pagado')
          dataRow.push({
            text: pag
          });
        else if (key == 'InteresR')
          dataRow.push({
            text: self.moneyTrans(row[key]) + ' %',
            alignment: 'right'
          });
        else if (a.includes(key))
          dataRow.push({
            text: self.moneyTrans(row[key]),
            alignment: 'right'
          });
        else
          dataRow.push(row[key]);
      })
      body.push(dataRow);
    });
    return body;
  }
}
