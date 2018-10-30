import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import { ExportService, imagenconstr } from '../parent/export.service';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable()
export class pdfAuditoriaIndividualService extends ExportService {

  constructor() {
    super();
  }

  tranformDate(date):any{
    var d = new Date(date);
    if (date == null){
      return 'Sin ingresar';
    }else{
      return d.toLocaleDateString('es-VE', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      }); 
    } 
  }

  getPeriodo(din):String{
    if(din.tiempo=='s')
      return 'Últimos días (7)'
    if(din.tiempo=='m')
      return 'Último mes (1)'
    if(din.tiempo=='x')
      return 'Último año (1)'
  }

  public pdfAuditoriaI(rout: any,  din: any, name) {
    var self = this;
    var dd = {
      info: {
        title: 'Auditoría individual'
      },
      header: function (currentPage, pageCount) { /*Tabla del header*/
        return {
          table: {
            widths: ['20%', '48%', '30%'],
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
                      {text:'Fecha de emisión:', bold:true}, 
                      {text:'Período consultado:', bold:true}, 
                    ],
                    [
                      '\n\n',
                      self.currentDate[0] + ' '+ self.currentDate[1] + ' ' + self.currentDate[2] + self.currentDate[3],
                      self.getPeriodo(din)
                    ]
                  ],
                  alignment: 'left'
                }
              ], //Fin Primera Fila
              [ //Segunda fila
                {
                  text: 'Reporte auditoría - Individual',
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
              widths: [55, 85, 33, 28, 80, 200],
              body: [
                [ {
                    text: 'Trabajador:',
                    bold: 'true'
                  },
                  {
                    text:name,
                    colSpan: 4
                  },
                  {},{},{},{},
                ],
                [{
                    text: 'Útimo acceso:',
                    bold: 'true'
                  },
                  {
                    text: self.tranformDate(rout.ultimoAcceso),
                  },
                  {
                    text: 'Accesos:',
                    bold: 'true'
                  },
                  {
                    text: rout.accesos,
                  },
                  {
                    text: 'Tiempo de conexión:',
                    bold: 'true'
                  },
                  {
                    text: rout.tiempoConexion,
                  },
                ],
              ]
            },
            colSpan: 3,
            layout: 'noBorders',
            margin: [5, 0, 0, 0]
          }, {}, {}
        ], //Fin 4ta Fila
        {
          text:'\n'
        },
        {
          table:
          {
            widths: [250, 250],
            body:
            [
              [
                {
                  table: {
                    widths: [80, 60],
                    body:
                    this.buildTable(rout.historial, 
                      ['nombre', 'iteracion'],
                      [
                        {text:'Reportes',bold:true},
                        {text:'Iteraciones', bold:true}],'r')
                  },
                  margin: [5, 0, 0, 0],
                  layout: 'lightHorizontalLines'
                },
                {
                  table: {
                    widths: [80, 60],
                    body:
                    this.buildTable(rout.historial, 
                      ['nombre', 'iteracion'],
                      [
                        {text:'Gestión',bold:true},
                        {text:'Iteraciones', bold:true}],'g')
                  },
                  margin: [5, 0, 0, 0],
                  layout: 'lightHorizontalLines'
                },
              ] 
            ]
        
          },  layout: 'noBorders'
        },
        
      
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
      pageSize: 'LETTER',
      pageMargins: [30, 130, 10, 20], //Content margins
      defaultStyle: {
        fontSize: 8
      }
    }
    pdfMake.createPdf(dd).open();
  }

  buildTable(data, key, columns,str) {

    var body = [];
    var a: Boolean = false;

    body.push(columns);

    if(data.length == 0){
      var dataRow = [];
      dataRow.push({text:'No hay informacion para mostrar', colSpan: 2},{})
      body.push(dataRow);
    }else{
    
      data.forEach(function (row) {
     
        if(row.flag==str){ 
          var dataRow = [];
          key.forEach(function (key) {
            dataRow.push(row[key]);
            a= true;
          })
          body.push(dataRow);
        }
         
      });

      if(!a){
        var dataRow = [];
        dataRow.push({text:'No hay informacion para mostrar', colSpan: 2},{})
        body.push(dataRow);
      }

    }

    return body;
  }
}

