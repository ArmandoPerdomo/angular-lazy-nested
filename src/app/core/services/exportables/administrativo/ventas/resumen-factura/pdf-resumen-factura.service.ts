import {
  Injectable
} from '@angular/core';
import {
  ExportService,
  imagenconstr
} from '../../../parent/export.service';
import {
  RepAdmFacturaResumenCompletoOut
} from '../../../../../../abstract/DTO/out/reportesAdmVentas/repAdmFacturaResumenCompleto/repAdmFacturaResumenCompleto';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable()
export class PdfResumenFacturaService extends ExportService {

  constructor() {
    super();
  }

  public pdfResumenFactura(dc: RepAdmFacturaResumenCompletoOut) {
    var self = this;
    var dd = {
      info: {
        title: 'Resumen factura - Nro. '+dc.ReporteFacturaResumenCompletoResult.ResumenFacturas[0].FacturaNum
      },
      header: function (currentPage, pageCount) { /*Tabla del header*/
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
                  text: 'RESUMEN FACTURA',
                  style: 'header',
                  colSpan: 3,
                  alignment: 'center'
                }, {}, {}
              ], //Fin Segunda Fila
              [ //Tercera fila
                {
                  text: 'NÚMERO: ' + dc.ReporteFacturaResumenCompletoResult.ResumenFacturas[0].FacturaNum,
                  colSpan: 3,
                  alignment: 'center'
                }, {}, {}
              ], //Fin Tercera Fila
              [ //4ta fila
                {
                  style: 'tableExample',
                  table: {
                    headerRows: 1,
                    body: [
                      [{
                          text: 'Cliente:',
                          bold: 'true'
                        },
                        dc.ReporteFacturaResumenCompletoResult.ResumenFacturas[0].Cliente,
                      ],

                      [{
                          text: 'Vendedor:',
                          bold: 'true'
                        },
                        dc.ReporteFacturaResumenCompletoResult.ResumenFacturas[0].Vendedor,
                      ],
                      [{
                          text: 'Transporte:',
                          bold: 'true'
                        },
                        dc.ReporteFacturaResumenCompletoResult.ResumenFacturas[0].Trasporte,
                      ],
                    ]
                  },
                  colSpan: 3,
                  layout: 'noBorders',
                  margin: [10, 0, 0, 0]
                }, {}, {}
              ] //Fin 4ta Fila
            ]
          },
          layout: 'noBorders',
          style: 'headerTable'
        }
      },
      content: [
        // Tabla de detalle  FACTURA
        this.tablaDespacho(dc.ReporteFacturaResumenCompletoResult.ResumenFacturas[0].Documentos[0], 'Factura: '),
        // FIN TABLA de detalle FACTURA
        {
          text: '\n'
        },
        // TABLA de detalle DESPACHO
        (dc.ReporteFacturaResumenCompletoResult.ResumenFacturas[0].Documentos.length == 2) ? (this.tablaDespacho(dc.ReporteFacturaResumenCompletoResult.ResumenFacturas[0].Documentos[1], 'Despacho: ')) : '',
        // FIN TABLA de detalle DESPACHO
        {
          text: '\n'
        },
        // Tabla de detalle
        // detalle de factura
        {
          style: 'tableExample',
          table: {
            body: [
              [{
                  text: 'Resumen Cantidad ',
                  bold: 'true'
                },
                {},
                {},
                {},
                {},
                {},
              ],
              [{},
                {},
                {},
                {},
                {},
                {},
              ],
            ]
          },
          layout: 'lightHorizontalLines',
          margin: [5, 0, 0, 0]
        }, // FIN detalle de factura
        // contenido
        {
          style: 'tableExample',
          table: {
            widths: [190, 40, 40, 40, 80, 80],
            body: self.buildTableBodyResumenCantidad(dc.ReporteFacturaResumenCompletoResult.ResumenFacturas[0].ResumenCantida,
              ['Articulo', 'Unidad', 'Facturado', 'Devuelto', 'Despachado', 'Pordespachar'],
              [
                {text:'Articulo',  bold:'true'},
                {text:'Unidad',  bold:'true'},
                {text:'Facturado',  bold:'true',alignment: 'right'},  
                {text:'Devuelto',  bold:'true',alignment: 'right'},  
                {text:'Despachado',  bold:'true',alignment: 'right'},  
                {text:'Por Desp.',  bold:'true',alignment: 'right'},  
              ]),
          },
          layout: 'lightHorizontalLines',
          margin: [5, 0, 0, 0]
        },
        // FIN contenido
        //Footer
        {
          table: {
            widths: [190, 40, 40, 40, 80, 80],
            body:
            [
              [
                {
                  text: '',
                },
                {
                  text: '',
                },
                {
                  text: '',
                },
                {
                  text: '',
                },
                {
                  text: '',
                },
                {
                  text: '',
                },
              ],
              [
                {
                  text: '',
                  border: [false, false, false, false],
                },
                {
                  text: '',
                  border: [false, false, false, false],
                },
                {
                  text: self.moneyTrans(self.sumarMontoRenglones(dc.ReporteFacturaResumenCompletoResult.ResumenFacturas[0].ResumenCantida, 'Facturado')),
                  bold: 'true',
                  alignment: 'right'
                },
                {
                  text: self.moneyTrans(self.sumarMontoRenglones(dc.ReporteFacturaResumenCompletoResult.ResumenFacturas[0].ResumenCantida, 'Devuelto')),
                  bold: 'true',
                  alignment: 'right'
                },
                {
                  text: self.moneyTrans(self.sumarMontoRenglones(dc.ReporteFacturaResumenCompletoResult.ResumenFacturas[0].ResumenCantida, 'Despachado')),
                  bold: 'true',
                  alignment: 'right'
                },
                {
                  text: self.moneyTrans(self.sumarMontoRenglones(dc.ReporteFacturaResumenCompletoResult.ResumenFacturas[0].ResumenCantida, 'Pordespachar')),
                  bold: 'true',
                  alignment: 'right'
                }
              ],
            ]
          },
          layout: 'lightHorizontalLines',   margin: [5, 0, 0, 0]
        },
        // fin Footer
        // FIN TABLA de detalle
        {
          text: '\n\n'
        },
        // tabla CxC
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: [120, 100],
            body: [
              [{
                text: 'Resumen CxC',
                bold: 'true',
                colSpan: 2,
                alignment: 'center'
              }, ''],
              ['Facturas',{ text: self.moneyTrans(dc.ReporteFacturaResumenCompletoResult.ResumenFacturas[0].ResumenCxc.Facturas), alignment: 'right'}],
              ['Devoluciones', { text:self.moneyTrans(dc.ReporteFacturaResumenCompletoResult.ResumenFacturas[0].ResumenCxc.Devoluciones), alignment: 'right'}],
              ['Notas de Crédito', { text:self.moneyTrans(dc.ReporteFacturaResumenCompletoResult.ResumenFacturas[0].ResumenCxc.NCR), alignment: 'right'}],
              ['Retención I.S.L.R.', { text:self.moneyTrans(dc.ReporteFacturaResumenCompletoResult.ResumenFacturas[0].ResumenCxc.RetencionISLA), alignment: 'right'}],
              ['Retención I.V.A.', { text:self.moneyTrans(dc.ReporteFacturaResumenCompletoResult.ResumenFacturas[0].ResumenCxc.RetencionIVA), alignment: 'right'}],
              ['Cobro en Efectivo',{ text: self.moneyTrans(dc.ReporteFacturaResumenCompletoResult.ResumenFacturas[0].ResumenCxc.CobroEnEfectivo), alignment: 'right'}],
              ['Saldo', { text:self.moneyTrans(dc.ReporteFacturaResumenCompletoResult.ResumenFacturas[0].ResumenCxc.Saldo), alignment: 'right'}],
            ]
          },
          layout: {
            hLineWidth: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 2 : 1;
            },
            vLineWidth: function (i, node) {
              return (i === 0 || i === node.table.widths.length) ? 2 : 1;
            },
            hLineColor: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
            },
            vLineColor: function (i, node) {
              return (i === 0 || i === node.table.widths.length) ? 'black' : 'white';
            }
          }
        },
        // FIN tabla CxC
      ],
      styles: {
        hTable: {
          bold: true,
          alignment: 'right'
        },

        bMTable: {
          alignment: 'right'
        },
        bTable: {
          alignment: 'justify'
        },
        headerTable: {
          margin: [25, 10, 10, 8]
        },

        header: {
          fontSize: 18,
          bold: true,
          alignment: 'justify'
        }
      },
      pageSize: 'LEGAL',

      pageMargins: [30, 190, 10, 20], //Content margins
      defaultStyle: {
        fontSize: 8
      }
    }
    pdfMake.createPdf(dd).open();
  }

  buildTableBodyResumenCantidad(data, key, columns) {
    var body = [];
    var self = this;
    body.push(columns);
    data.forEach(function (row) {
      var dataRow = [];
      key.forEach(function (key) {
        if (key == 'Fecha') {
          dataRow.push(self.transformDateTable(row[key]));
        } else if (key == 'Despachado' || key == 'Devuelto' || key == 'Facturado' || key == 'Pordespachar') {
          dataRow.push({text:self.moneyTrans(row[key]), alignment: 'right'});
        } else {
          dataRow.push(row[key]);
        }
      })
      body.push(dataRow);
    });
    return body;
  }
  buildTablaDetalle(data, str: string) {
    return {
      table: {
        body: [
          [{
              text: str,
              bold: 'true'
            },
            data.NumeroDocumento,
            {
              text: 'Fecha de Emisión:',
              bold: 'true'
            },
            this.transformDateTable(data.FechaEmision),
            {
              text: 'Fecha de Vencimiento:',
              bold: 'true'
            },
            this.transformDateTable(data.FechaVencimiento),
          ],
          [{},
            {},
            {},
            {},
            {},
            {},
          ],
        ]
      },
      layout: 'lightHorizontalLines',
      margin: [5, 0, 0, 0]
    }
  }
  buildTablaDetalleFooterBlanco() {
    return {
      style: 'tableExample',
      table: {
        widths: [190, 70, 40, 42, 80, 80],
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
              text: '',
              border: [false, false, false, false],
            },
            {
              text: '',
              border: [false, false, false, false],
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
        ]
      }
    }
  }
  buildTablaDetalleFooterInfo(data) {
    return {
      style: 'tableExample',
      table: {
        widths: [210, 70, 40, 40, 70, 85],
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
              text: '',
              border: [false, false, false, false],
            },
            {
              text: '',
              border: [false, false, false, false],
            },
            {
              text: 'Sub total:',
              style: 'hTable',
              border: [false, false, false, false],
            },
            {
              text:this.moneyTrans(data.Sub_Total),
              style: 'hTable',
            }
          ],
          [{
              text: '',
              border: [false, false, false, false],
            },
            {
              text: '',
              border: [false, false, false, false],
            },
            {
              text: '',
              border: [false, false, false, false],
            },
            {
              text: '',
              border: [false, false, false, false],
            },
            {
              text: 'Iva:',
              style: 'hTable',
              border: [false, false, false, false],
            },
            {
              text:this.moneyTrans(data.Iva),
              style: 'hTable',
            }
          ],
          [{
              text: '',
              border: [false, false, false, false],
            },
            {
              text: '',
              border: [false, false, false, false],
            },
            {
              text: '',
              border: [false, false, false, false],
            },
            {
              text: '',
              border: [false, false, false, false],
            },
            {
              text: 'Total:',
              style: 'hTable',
              border: [false, false, false, false],
            },
            {
              text:this.moneyTrans(data.Total),
              style: 'hTable',
            }
          ],
        ]
      },
      layout: 'noBorders',
      alignment: 'right'
    }
  }
  buildTablaContenido(data, key, columns, wh) {
    return {
      style: 'tableExample',
      table: {
        widths: wh,
        body: this.buildTableBodyBest(data.DetalleDocumentos, key, columns),
      },
      layout: 'lightHorizontalLines',
      margin: [5, 0, 0, 0]
    }

  }

  tablaDespacho(data, str: string) {
    var body = [
      this.buildTablaDetalle(data, str),
      this.buildTablaContenido(data,
        ['Articulo', 'Almacen', 'Cantidad', 'Unidad', 'Precio', 'Neto'], 
        [
          {text:'Artículo', bold:'true'},
          {text:'Almacén', bold:'true'},  
          {text:'Cant',  bold:'true',alignment: 'right'},  
          {text:'Unidad',  bold:'true'},  
          {text:'Precio', bold:'true',alignment: 'right'},  
          {text:'Neto',bold:'true',alignment: 'right'} ],
           [190, 40, 40, 40, 80, 80]),
      this.buildTablaDetalleFooterBlanco(),
      this.buildTablaDetalleFooterInfo(data),
    ];
    return body
  }
}