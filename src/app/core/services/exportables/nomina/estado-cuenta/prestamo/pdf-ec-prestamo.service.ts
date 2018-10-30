import {Injectable} from '@angular/core';
import {ExportService, imagenconstr} from '../../../parent/export.service';
import { RepNomEstCuentaPrestamosOut } from '../../../../../../abstract/DTO/out/reportesNomina/repNomEstCuentaPrestamos/repNomEstCuentaPrestamosOut';
import { RepNomEstCuentaPrestamosIn } from '../../../../../../abstract/DTO/in/reportesNomina/repNomEstCuentaPrestamosIn';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable()
export class PdfEcPrestamoService extends ExportService {

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
      var sus: String = "";
      var acum: Number = 0;
      a = +a + +1;
      var objtabla1 = {
        table: {
          widths: [73,200],
          body: 
          [
            [
              {text: 'Trabajador:', bold: 'true'},
              {text: el['CodigoTrabajador']+el['Trabajador']},
            ],
            [
              {text: 'Tipo de préstamo:',  bold: 'true'},
              {text: el['TipoPrestamo']+el['CodigoTipo']},
            ],
          ]    
        }, layout: 'noBorders'
      };

      var objtabla2 = {
        table: {
          widths: [30, 50, 55, 30,45,40,45,50,45,60,55,60],
          body: [],    
        }, layout: 'lightHorizontalLines'
      };
      var row21 = [];
      var row22 = [];
    
      if(el['Suspendido'])
        sus = 'Sí';
      else
        sus = 'No';

      row21.push({text:'Número', bold:'true'});
      row21.push({text:'Fecha asignación', bold:'true'});
      row21.push({text:'Monto',  bold:'true', alignment: 'right'});
      row21.push({text:'Interés', bold:'true', alignment: 'right'});
      row21.push({text:'Frecuencia', bold:'true'});
      row21.push({text:'Método', bold:'true'});
      row21.push({text:'Cant. cuotas', bold:'true' , alignment: 'right'});
      row21.push({text:'Fecha 1ra cuota', bold:'true'});
      row21.push({text:'Cuotas pagadas', bold:'true', alignment: 'right'});
      row21.push({text:'Saldo', bold:'true', alignment: 'right'});
      row21.push({text:'Suspendido', bold:'true'});
      row21.push({text:'Hasta la fecha', bold:'true'});
      row22.push({text:el['Numero']});
      row22.push({text:this.transformDateTable(el['FechaAsignacion'])});
      row22.push({text:this.moneyTrans(el['Monto']), alignment: 'right'});
      row22.push({text:this.moneyTrans(el['Interes']), alignment: 'right'});
      row22.push({text:el['Frecuencia']});
      row22.push({text:el['Metodo']});
      row22.push({text:this.moneyTrans(el['Cuotas']+' %'), alignment: 'right'});
      row22.push({text:el['Fecha1Cuota']});
      row22.push({text:this.moneyTrans(el['CuotasPagadas']+' %'), alignment: 'right'});
      row22.push({text:this.moneyTrans(el['Saldo']), alignment: 'right'});
      row22.push({text:sus.toString()});
      row22.push({text:el['HastaLaFecha']});
      
      objtabla2.table.body.push(row21);
      objtabla2.table.body.push(row22);

      var objtabla3 = {
        table: {
          widths: [50, 115, 80, 70, 70, 75, 55, 115],
          body: this.buildTablePrestamo(el.DetallePrestamo,
            ['Renglones', 'FechaVencimiento', 'Capital', 'ValorCuota', 'Amortizacion', 'InteresR', 'Pagado', 'Recibo']),
        },
        layout: 'lightHorizontalLines'
      };

      el.DetallePrestamo.forEach(x => {
        if (x.Pagado)
          acum = +acum + +x.ValorCuota;
      });

      var objtabla4 = {
        table: {
          widths: [50, 115, 80, 70, 70, 75, 55, 115],
          body: [
            [{},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
            ],
            [{},
              {},
              {
                text: 'Total abonado:',
                alignment: 'right',
                bold: 'true'
              },
              {
                text: this.moneyTrans(acum),
                alignment: 'right',
                bold: 'true'
              },
              {},
              {},
              {},
              {},
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


  public pdfEdoCuentaPrestamo(dout: RepNomEstCuentaPrestamosOut, din: RepNomEstCuentaPrestamosIn) {
    var self = this;
    var dd = {
      info: {
        title: 'Control de préstamos'
      },
      header: function(currentPage, pageCount){/*Tabla del header*/
          return {
              table: 
              {
                widths: ['25%','45%','25%'],
                heights:['auto','auto','auto'],
                body: 
                [
                  [//Primera fila
                      {//Imagen
                          image: imagenconstr,
                          width: 140,
                          height:80
                      },
                      {//Membrete
                          text:'\n\nAv. Los Pinos, entre calle Pomagas y Los Mangos,Casa Nro. 35 Urb. La Florida Norte, Zona Portal 1050 Ofi. +58212731.2087',
                          alignment:'center', fontSize:12
                      },
                      {//Detalles
                          columns:[
                            [//Fila
                                  '\n\n',
                                  {text:'Fecha:', bold:'true'},
                                  {text:'Hora:', bold:'true'},
                                  {text:'Página:', bold:'true'},
                            ],
                                [
                                    '\n\n',
                                    self.currentDate[0],
                                    self.currentDate[1] + ' ' + self.currentDate[2] + self.currentDate[3],
                                    currentPage.toString()+'/'+ pageCount.toString() //Implement new Date
                                ]
                              ],
                              alignment:'left', margin : [100,5,5,5]
                      }
                  ],//Fin Primera Fila
                    [ //Segunda fila
                        {
                          text: 'CONTROL DE PRÉSTAMOS POR TRABAJADOR',
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
                                      [
                                        {
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
                              margin: [200, 0, 0, 0]
                            }, {}, {}
                      ], //Fin Tercera Fila
                ]
              },
              layout: 'noBorders',
              style: 'headerTable'
          }
      },
    content:
    [
        self.buildBody(dout.RepEdoCtaPrestamoResult.ResumenPrestaciones),
    ],
    styles: 
    {
      headerTable:
      {
          margin: [5, 10, 10,8]
      },

      header: 
      {
        fontSize: 18,
        bold: true,
        alignment: 'justify'
      }
    
    },
      pageSize: 'LETTER',
      pageOrientation: 'landscape',
      pageMargins: [25, 140, 10, 20],//Content margins
      defaultStyle: 
      {
          fontSize: 8
      }
    
  }
  
    pdfMake.createPdf(dd).open();
  }

  buildTablePrestamo(data,key) {
    var body = [];
    let a = ['Capital', 'ValorCuota', 'Amortizacion', 'InteresR'];
    var columns = [
      {text: 'Nro. cuota', bold: 'true'},
      {text: 'Fecha vencimiento', bold: 'true'},
      {text: 'Capital', bold: 'true', alignment: 'right'},
      {text: 'Valor cuenta', bold: 'true', alignment: 'right'},
      {text: 'Amortización', bold: 'true', alignment: 'right'},
      {text: 'Interés', bold: 'true', alignment: 'right'},
      {text: 'Pagado', bold: 'true'}, 
      {text: 'Recibo', bold: 'true'}
    ];
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
            dataRow.push({text:pag});
        else if (key == 'InteresR')
            dataRow.push({text:self.moneyTrans(row[key])+' %',alignment: 'right'});
        else if (a.includes(key))
              dataRow.push({text:self.moneyTrans(row[key]), alignment: 'right'});
        else
            dataRow.push(row[key]);
      })
      body.push(dataRow);
    });
    return body;
  }
}
