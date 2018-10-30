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
export class PdfCxpProveedorService extends ExportService {

  constructor() {
    super();
  }

  buildTableBodyBestCx(data, key) {
    var body = [];
    var self = this;

    data.forEach(function (row) {
      var subody = [];
      var otroarr = [];

      subody.push(row['Co_cli'] + '-' + row['Cli_des']);
      var content = [];
      var subcontent = [];
      var object = {
        table: {
          widths: [35, 40, 48, 48, 180, 70, 70],
          body: []
        }
      };
      let acumneto = 0;
      let acumsaldo = 0;
      row['CxC'].forEach(element => {

        var subdata = [];
        if (!element['Anulado']) {
          acumneto += element['Monto_net'];
          acumsaldo += element['Saldo'];
        }

        key.forEach(function (key) {
          if (key == 'Fec_emis' || key == 'Fec_venc')
            subdata.push(self.transformDateTable(element[key]));
          else if (key == 'Monto_net' || key == 'Saldo')
            subdata.push({text:self.moneyTrans(element[key]), alignment: 'right'});
          else if (key == 'Comentario' && element['Anulado'])
            subdata.push('ANULADO');
          else
            subdata.push(element[key]);
        });

        object.table.body.push(subdata);
      });
      object.table.body.push(['', '', '', '', {text:'Total', alignment: 'right', bold:true}, {text: self.moneyTrans(acumneto), alignment: 'right', bold:true},  {text:self.moneyTrans(acumsaldo), alignment: 'right', bold:true}]);

      subcontent.push(object);
      content.push(subcontent);
      otroarr.push(content);
      body.push(subody);
      body.push(otroarr);
    });

    return body;
  }

  public PdfCxP(dc: any) {
    var data;
    var nro;
    var title;
    
    title = 'DOCUMENTO CxP';
    nro = 'Nro_fact';
    data = dc.CxPPorProveedorResult.Proveedor;
    var self = this;
    var dd = {
      info: {
        title: title
      },
      header: function (currentPage, pageCount) {
        return {
          table: {
            widths: ['20%', '58%', '20%'],
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
                      {text:'Fecha:', bold:'true'},
                      {text:'Hora:', bold:'true'},
                      {text:'Página:', bold:'true'},

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
                  text: title,
                  style: 'header',
                  colSpan: 3,
                  alignment: 'center'
                }, {}, {}
              ], //Fin Segunda Fila

              [ //Tercera fila
                {
                  style: 'tableExample',
                  table: {
                    widths: [33, 44, 46, 49, 185, 70, 70],
                    body: [
                      [{
                        text: 'Tipo doc.',
                        bold: true,
                        border: [false, true, false, true],
                      },
                      {
                        text: 'Número',
                        bold: true,
                        border: [false, true, false, true],
                      },
                      {
                        text: 'Emisión',
                        bold: true,
                        border: [false, true, false, true],
                      },
                      {
                        text: 'Vencimiento',
                        bold: true,
                        border: [false, true, false, true],
                      },
                      {
                        text: 'Observación',
                        bold: true,
                        border: [false, true, false, true],
                      },
                      {
                        text: 'Neto',
                        alignment: 'right',
                        bold: true,
                        border: [false, true, false, true],
                      },
                      {
                        text: 'Saldo',
                        alignment: 'right',
                        bold: true,
                        border: [false, true, false, true],
                      },
                    ],
                  ]
                  },
                  colSpan: 3,
                }, {}, {}
              ] //Fin 3ra Fila
            ]
          },
          layout: 'noBorders',
          style: 'headerTable'
        }
      },
      content: [{
        style: 'tableExample',
        table: {
          body: this.buildTableBodyBestCx(data, ['Tipo_doc', nro, 'Fec_emis', 'Fec_venc', 'Comentario', 'Monto_net', 'Saldo'])
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
