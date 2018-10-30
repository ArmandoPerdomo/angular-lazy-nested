import { Injectable} from '@angular/core';
import { ExportService, imagenconstr} from '../../../parent/export.service';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import {  RepAdmFormatosCobPagOut} from '../../../../../../abstract/DTO/out/reportes/repAdmFormatosCobPag/repAdmFormatosCobPag';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable()
export class PdfPagoDigitalService extends ExportService {

  constructor() {
    super();
  }

  public pdfComprasPago(dc: RepAdmFormatosCobPagOut) {
    var self = this;
    const docDefinition = {
      pageSize: 'LEGAL',
      defaultStyle: {
        fontSize: 8
      },
      pageMargins: [40, 100, 40, 100],
      info: {
        title: 'Pago digital - Nro: '+ dc.FormatosCobPagResult.Encabezado.Numero.toString()
      },
      // ------------------------------ HEADER -------------------------------------
      header: function (currentPage, pageCount) {
        var headerObj = {
          style: 'tableExample5',
          columns: [{
              image: imagenconstr,
              width: 140,
              height: 80,
              margin: [5, 2, 10, 20]
            },
            {
              text: '\n\nAv. Los Pinos, entre calle Pomagas y Los Mangos, Casa Nro. 35 Urb. La Florida Norte, Zona Portal 1050 Ofi. +58212731.2087',
              alignment: 'center',
              fontSize: 12,
              width: 290,
            },
            {
              table: {
                style: 'tableExample2',
                margin: [5, 2, 10, 5],
                width: 130,
                headerRows: 1,
                body: [
                  [{text:'\n\nNro.:',bold: true}, '\n\n' + dc.FormatosCobPagResult.Encabezado.Numero.toString()],
                  [{text:'Fecha de Emisión:',bold: true}, self.transformDateTable(dc.FormatosCobPagResult.Encabezado.FechaEmis.toString())],
                ]
              },
              layout: 'noBorders'
            }
          ],
          margin: [7, 7],
          columnGap: 10,
        };
        return headerObj;
      },
      // ------------------------------ Contenido -------------------------------------
      content: [
        //* ------------------------------ Primer bloque -------------------------------------
        {
          style: 'tableExample6',
          table: {
            widths: [100, 411],
            body: [
              ['Proveedor:', dc.FormatosCobPagResult.Encabezado.Nombre_Prov_Clien.toString()],
              ['R.I.F.:', dc.FormatosCobPagResult.Encabezado.Rif.toString()],
              ['Dirección:', dc.FormatosCobPagResult.Encabezado.Dreccion.toString()],
              ['Teléfonos:', dc.FormatosCobPagResult.Encabezado.Telefono.toString()],
              ['Descripción:', dc.FormatosCobPagResult.Encabezado.Descripcion.toString()],
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
              return (i === 0 || i === node.table.body.length) ? 'black' : 'white';
            },
            vLineColor: function (i, node) {
              return (i === 0 || i === node.table.widths.length) ? 'black' : 'white';
            },
          }
        },
       //* ------------------------------ Segundo bloque -------------------------------------
       {
        style: 'tableBlock2',
        table: {
          margins: [0,0,0,0],
          widths: [25, 30, 70, 117, 60, 117, 42],
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
                text:'Banco/Tarjeta',
                bold:true,
              },
              
              {
                text: '',
                border: [false, false, false, false],
              },
              {
                text:'Caja/Cuenta',
                bold:true,
              },
              {
                text: '',
                border: [false, false, false, false],
              }
            ],
          ]
        }
      },
      {
        table:{
          widths:[22, 25, 57, 30, 65, 55, 30, 65, 55],
          body:this.buildTableBodyBest(dc.FormatosCobPagResult.TipoPago,['Renglon', 'Tipo', 'Documento', 'CodigoBanTar', 'DescripcionBanTar', 'FechaCheque', 'CodigoCajCta', 'DescripcionCajCta', 'Monto'],
          [{text:'Reng.',bold:true},
           {text:'Tipo',bold:true} ,
           {text:'Nro.Documento',bold:true},
           {text: 'Código', bold:true},
           {text:'Descripción', bold:true},
           {text:'Fecha cheque',  bold:true},
           {text:'Código', bold:true},
           {text: 'Descripción', bold:true},
           {text: 'Monto', bold:true, alignment: 'right'}]),
        }, layout: 'lightHorizontalLines'
      },
      {
        text:'\n'
      },
      {
        table:{
          widths:[25, 30, 74, 160, 180],
          body:this.buildTableBest(dc.FormatosCobPagResult.DocumentosAsociados, ['Renglon', 'Tipo', 'Documento', 'MontoDocumento', 'MontoAbonado'],
          [{text:'Reng.', bold:true},
          {text:'Tipo', bold:true},
          {text: 'Nro.Documento',  bold:true},
          {text:'Monto del Documento', bold:true, alignment: 'right'},
          {text: 'Monto Abonado', bold:true, alignment: 'right'}]),
        }, layout: 'lightHorizontalLines'
      },
      {
        style: 'tableBlock2',
        table: {
          widths: [25, 30, 74, 160, 180],
          body: [
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
            ],
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
                text: 'Monto',
                bold:true, alignment: 'right'
              },
              {
                text: this.moneyTrans(this.sumarMontoAbonado(dc.FormatosCobPagResult.DocumentosAsociados)),
                bold:true, alignment: 'right'
              },
            ],
          ]
        },
        layout: 'lightHorizontalLines'
      }, ,
      //* ------------------------------ Cuarto bloque -------------------------------------
    ], // Fin del contenido
      styles: {
        tableExample: {
          fontSize: 8,
          margin: [0, 5, 0, 5],
          alignment: 'center'
        },
        tableExample6: {
          fontSize: 8,
          margin: [0, 5, 0, 10],
        },
        tableExample5: {
          fontSize: 8,
        },
        tableBlock2: {
          fontSize: 8,
          margin: [0, 0, 0, 0],
          alignment: 'center',
        },
        tableBlock3: {
          fontSize: 7,
          margin: [0, 10, 0, 0],
          alignment: 'center',
        },
        defaultStyle: {
          fontSize: 12
        }
      }
    };
    pdfMake.createPdf(docDefinition).open();
  }


  sumarMontoAbonado(tipoPago: any): Number {
    let acum: Number = 0;
    tipoPago.forEach(element => {
      if(element.Tipo =='FACT')
      acum += element['MontoAbonado'];
  });
  return acum
}

buildTableBest(data, key, columns) {
  var body = [];
  var self = this;

  //?Agregar acá las key necesarias para las columnas que requieran formato de cantidad/monto.
  let a = ['Stock_act', 'Stock_Comp', 'Stock_Disp', 'Neto', 'Monto', 'Cantidad', 'Precio', 'Total', 'MontoDocumento',
    'StockIni', 'Compras', 'Salidas', 'Ventas', 'entradas', 'StockFinal', 'StockG01', 'Debe', 'Haber', 'ITF'
  ]

  body.push(columns);

  data.forEach(function (row) {
    var dataRow = [];
    key.forEach(function (key) {
      if (key == 'Fecha' || key == 'FechaCheque') {
        dataRow.push(self.transformDateTable(row[key]));
      } else if (a.includes(key)) {
        dataRow.push({ text:self.moneyTrans(row[key]), alignment:'right'});
      } else if ( key == 'MontoAbonado' && row['Tipo'] != 'FACT') {
        dataRow.push({ text:'- ' +self.moneyTrans(row[key]), alignment:'right'});
      } else if ( key == 'MontoAbonado') {
        dataRow.push({ text:self.moneyTrans(row[key]), alignment:'right'});
      }else {
        dataRow.push(row[key]);
      }
    })
    body.push(dataRow);
  });
  return body;
}
}
