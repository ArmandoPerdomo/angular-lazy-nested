import { Injectable } from '@angular/core';
import { ExportService, imagenconstr } from '../../../parent/export.service';
import { RepAdmVentasVsCompraIn } from '../../../../../../abstract/DTO/in/reportesAdmInventario/repAdmVentasVsComprasIn';
import { RepAdmVentasVsComprasOut } from '../../../../../../abstract/DTO/out/reportesAdmInventario/repAdmVentasVsCompras/repAdmVentasVsComprasOut';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable()
export class PdfComprasVsVentasService extends ExportService {

  constructor() {
    super();
  }

  //? PDFMake para Compras Vs. Ventas.
  public pdfComprasVsVentas(rin: RepAdmVentasVsCompraIn, rout: RepAdmVentasVsComprasOut) {
    var self = this;
    
    var dd = {
      info: {
        title: 'Compras vs. ventas'
      },
      header: function (currentPage, pageCount) { /*Tabla del header*/
        return {
          table: {
            widths: ['20%', '50%', '30%'],
            heights: ['auto', 'auto', 'auto'],
            body: [
              [ //Primera fila
                { //Imagen
                  image: imagenconstr,
                  width: 180,
                  height: 100
                },
                { //Membrete
                  text: '\n\nAv. Los Pinos, entre calle Pomagas y Los Mangos,Casa Nro. 35 Urb. La Florida Norte, Zona Portal 1050 Ofi. +58212731.2087',
                  alignment: 'center',
                  fontSize: 12,
                  margin: [130, 0, 0, 0]
                },
                { //Detalles
                  columns: [
                    [ //Fila
                      {
                        text: '\n\n\nFecha de Emisión:  ',
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
                      '\n\n\n',
                      self.currentDate[0],
                      self.currentDate[1] + ' ' + self.currentDate[2] + self.currentDate[3],
                      currentPage.toString() + '/' + pageCount.toString() //Implement new Date
                    ]
                  ],
                  alignment: 'left',
                  margin: [90, 0, 0, 0]
                }
              ], //Fin Primera Fila
              [ //Segunda fila
                {
                  text: 'TOTAL COMPRAS VS. VENTAS',
                  style: 'header',
                  colSpan: 3,
                  alignment: 'center',
                  margin : [30,0,0,0]
                }, {}, {}
              ], //Fin Segunda Fila
              [ //Tercera fila
                {
                  style: 'tableExample',
                  table: {
                    body: [
                      [{
                          text: 'RANGOS', bold:true,
                          style: 'tableHeader'
                        },
                        {
                          text: 'Artículo:',bold:true,
                          style: 'tableHeader2'
                        },{ text:' Desde:', bold:true,}, rin.Articulo_D, {text:'Hasta:',bold:true}, rin.Articulo_h,
                        {
                          text: 'Fecha:',bold:true,
                          style: 'tableHeader2'
                        }, ' Desde:', self.transform(rin.Fecha_D), 'Hasta:', self.transform(rin.Fecha_h),
                      ],
                    ]
                  },
                  colSpan: 3,
                  alignment: 'center',
                  layout: 'noBorders',
                  margin: [240, 0, 0, 0]
                }, {}, {}
              ], //Fin 3ta Fila
              [ //Cuarta fila
                {
                  style: 'tableExample',
                  table: {
                    widths: [80, 180, 25, 55, 55, 55, 55, 55, 55, 58],
                    body: [
                      [{
                          text: 'Artículo',
                          style: 'hTable',
                          border: [false, true, false, true],
                        },
                        {
                          text: 'Descripción',
                          style: 'hTable',
                          border: [false, true, false, true],
                        },
                        {
                          text: 'Unid.',
                          style: 'hTable',
                          border: [false, true, false, true],
                        },
                        {
                          text: 'Stock Ini.',
                          style: 'hmTable',
                          border: [false, true, false, true],
                        },
                        {
                          text: 'Compras',
                          style: 'hmTable',
                          border: [false, true, false, true],
                        },
                        {
                          text: 'Salidas',
                          style: 'hmTable',
                          border: [false, true, false, true],
                        },
                        {
                          text: 'Ventas',
                          style: 'hmTable',
                          border: [false, true, false, true],
                        },
                        {
                          text: 'Entradas',
                          style: 'hmTable',
                          border: [false, true, false, true],
                        },
                        {
                          text: 'Stock Fin.',
                          style: 'hmTable',
                          border: [false, true, false, true],
                        },
                        {
                          text: 'Stock G-01',
                          style: 'hmTable',
                          border: [false, true, false, true],
                        }
                      ],
                    ]
                  },
                  colSpan: 3,
                  alignment: 'center',
                  margin: [12, 0, 0, 15]
                }
              ] //Fin 4ta Fila
            ]
          },
          layout: 'noBorders',
          style: 'headerTable'
        }
      },
      content: [{
          style: 'tableExample',
          table: {
            widths: [80, 175, 20, 50, 50, 45, 45, 50, 50, 55],
            body: this.buildTableBodyBest(rout.RepVentasVsCompras.Documeto,
              ['Articulo', 'Descripcion', 'Unidad', 'StockIni', 'Compras', 'Salidas', 'Ventas', 'entradas', 'StockFinal', 'StockG01'],
              ['', '', '', '', '', '', '', '', '', ''])
          },
          layout: 'lightHorizontalLines',
        },
        //?Separador
        {
          style: 'tableExample',
          table: {
            widths: [80, 180, 25, 55, 55, 55, 55, 55, 55, 60],
            body: [
              [{
                  text: '',
                  border: [false, false, false, true],
                },
                {
                  text: '',
                  border: [false, false, false, true],
                },
                {
                  text: '',
                  border: [false, false, false, true],
                },
                {
                  text: '',
                  border: [false, false, false, true],
                },
                {
                  text: '',
                  border: [false, false, false, true],
                },
                {
                  text: '',
                  border: [false, false, false, true],
                },
                {
                  text: '',
                  border: [false, false, false, true],
                },
                {
                  text: '',
                  border: [false, false, false, true],
                },
                {
                  text: '',
                  border: [false, false, false, true],
                },
                {
                  text: '',
                  border: [false, false, false, true],
                },
              ],
            ],
          },
        }, //?Fin de separador
        //?Totales
        {
          style: 'tableExample',
          table: {
            widths: [80, 175, 20, 50, 50, 45, 45, 50, 50, 55],
            body: self.summary1(rout),
          },
          layout: 'lightHorizontalLines',
        }, //?Fin de totales
        //?Totales artículos que manejan stock
        {
          style: 'tableExample',
          table: {
            style: 'htable',
            widths: [80, 175, 20, 50, 50, 45, 45, 50, 50, 55],
            body: this.summary2(rout),
          },
          layout: 'lightHorizontalLines',
        }, //?Fin de totales de stock
        //?Totales artículos de servicio
        {
          style: 'tableExample',
          table: {
            widths:[80, 175, 20, 50, 50, 45, 45, 50, 50, 55],
            body: this.summary3(rout),
          },
          layout: 'lightHorizontalLines',
        }, //?Fin totales de servicio
      ],
      styles: {
        hTable: {
          bold: true,
          alignment: 'left'
        },
        hmTable: {
          alignment: 'right',
          bold: true,
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
      pageOrientation: 'landscape',
      pageMargins: [15, 178, 40, 10],
      defaultStyle: {
        fontSize: 8
      }
    }
    pdfMake.createPdf(dd).open();
  }

  summary1(rout: RepAdmVentasVsComprasOut) {
    let body = [];
    let self = this;
    let row = [];
    row.push('');
    row.push({
      text: 'Totales:',
      bold: true
    });
    row.push('');
    row.push({
      text: self.moneyTrans(self.sumarMontoRenglones(rout.RepVentasVsCompras.Documeto, 'StockIni')),
      alignment: 'right'
    });
    row.push({
      text: self.moneyTrans(self.sumarMontoRenglones(rout.RepVentasVsCompras.Documeto, 'Compras')),
      alignment: 'right'
    });
    row.push({
      text: self.moneyTrans(self.sumarMontoRenglones(rout.RepVentasVsCompras.Documeto, 'Salidas')),
      alignment: 'right'
    });
    row.push({
      text: self.moneyTrans(self.sumarMontoRenglones(rout.RepVentasVsCompras.Documeto, 'Ventas')),
      alignment: 'right'
    });
    row.push({
      text: self.moneyTrans(self.sumarMontoRenglones(rout.RepVentasVsCompras.Documeto, 'entradas')),
      alignment: 'right'
    });
    row.push({
      text: self.moneyTrans(self.sumarMontoRenglones(rout.RepVentasVsCompras.Documeto, 'StockFinal')),
      alignment: 'right'
    });
    row.push({
      text: self.moneyTrans(self.sumarMontoRenglones(rout.RepVentasVsCompras.Documeto, 'StockG01')),
      alignment: 'right'
    });
    body.push(row);
    return body;
  }

  summary2(rout: RepAdmVentasVsComprasOut) {
    let body = [];
    let self = this;
    let row = [];
    row.push('');
    row.push({
      text: 'Totales artículos que manejan stock:',
      bold: true
    });
    row.push('');
    row.push({
      text: self.moneyTrans(rout.RepVentasVsCompras.TotInicial1),
      alignment: 'right'
    });
    row.push({
      text: self.moneyTrans(rout.RepVentasVsCompras.TotCompra1),
      alignment: 'right'
    });
    row.push({
      text: self.moneyTrans(rout.RepVentasVsCompras.TotSalida1),
      alignment: 'right'
    });
    row.push({
      text: self.moneyTrans(rout.RepVentasVsCompras.TotVenta1),
      alignment: 'right'
    });
    row.push({
      text: self.moneyTrans(rout.RepVentasVsCompras.TotSalida1),
      alignment: 'right'
    });
    row.push({
      text: self.moneyTrans(rout.RepVentasVsCompras.TotFinal1),
      alignment: 'right'
    });
    row.push('');
    body.push(row);
    return body;
  }

  summary3(rout: RepAdmVentasVsComprasOut) {
    let body = [];
    let self = this;
    let row = [];
    row.push('');
    row.push({
      text: 'Totales artículos de servicio:',
      bold: true
    });
    row.push('');
    row.push('');
    row.push({
      text: self.moneyTrans(rout.RepVentasVsCompras.TotCompra2),
      alignment: 'right'
    });
    row.push({
      text: self.moneyTrans(rout.RepVentasVsCompras.TotSalida2),
      alignment: 'right'
    });
    row.push({
      text: self.moneyTrans(rout.RepVentasVsCompras.TotVenta2),
      alignment: 'right'
    });
    row.push({
      text: self.moneyTrans(rout.RepVentasVsCompras.TotSalida2),
      alignment: 'right'
    });
    row.push('');
    row.push('');
    body.push(row);
    return body;
  }
}
