import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import { ExportService, imagenconstr } from '../parent/export.service';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable()
export class pdfAuditoriaGeneralService extends ExportService {

  constructor() {
    super();
  }


  getPeriodo(din):String{
    if(din.tiempo=='s')
      return 'Últimos días (7)'
    if(din.tiempo=='m')
      return 'Último mes (1)'
    if(din.tiempo=='x')
      return 'Último año (1)'
  }

  public pdfAuditoriaG(rout: any, din: any) {
    var self = this;
    var dd = {
      info: {
        title: 'Auditoría general'
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
                  text: 'Reporte auditoría - General',
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
        {
          table: {
            widths: [100, 46, 190, 70, 80],
            body: this.buildTableBodyBest(rout, 
              ['nombreDepartamento', 'nroAccesos', 'tiempoConexion', 'nroReportes', 'nroGestion'],
              [
                {text:'Nombre departamento',bold:true},
                {text:'Acceso', bold:true},
                {text:'Tiempo de conexión',bold:true},
                {text:'Reportes', bold:true},
                {text:'Gestión',bold:true}])
          },
          layout: 'lightHorizontalLines'
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
}
