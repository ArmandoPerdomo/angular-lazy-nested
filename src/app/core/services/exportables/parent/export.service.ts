import {
  Injectable
} from '@angular/core';
import {
  IMAGE_CONSTRUTODO_64
} from '../../../constants/construtodo.image64.constant';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';


pdfMake.vfs = pdfFonts.pdfMake.vfs;
export const imagenconstr = IMAGE_CONSTRUTODO_64;

@Injectable()
export class ExportService {

  constructor() {
    //?Obtiene la fecha actual.
    this.currentDate = new Date().toLocaleDateString('es-VE', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).split(' ');

  }

  currentDate: any;

  //?Formato para fecha tipo IN (Dato Date).
  transform(value: any, args ? : any): any {
    if (value != null) {
      let date = value.split('-');
      var ano = date[0];
      var mes = date[1];
      var dia = date[2];
      return dia + "/" + mes + "/" + ano;
    } else
      return null;
  }

  //?Formato para fecha tipo OUT (Dato String).
  transformDateTable(value: any, args ? : any): any {
    if (value != null) {
      var ano = value.substring(0, 4);
      var mes = value.substring(4, 6);
      var dia = value.substring(6, 8);
      return dia + "/" + mes + "/" + ano;
    } else
      return null;
  }

  //?Formato para montos y cantidades.
  moneyTrans(monto): string {
    let mont = parseFloat(monto);
    return new Intl.NumberFormat('es-ve', {
      minimumFractionDigits: 2
    }).format(mont);
  }

  //?Constructor de cuerpo (content) para PDFs (tabla listado).
  /*
   * @params
   *   data: Información que se cargará en la tabla.
   *   key: Array con las key (props) de la tabla.
   *   columns: Array para header (si ya se agregó header en el método enviar un array con strings vacíos).
   * @return:
   *   body: Cuerpo de la tabla.
   */
  buildTableBodyBest(data, key, columns) {
    var body = [];
    var self = this;

    //?Agregar acá las key necesarias para las columnas que requieran formato de cantidad/monto.
    let a = ['prec_vta1','stock_act','Stock_act', 'Stock_Comp', 'Stock_Disp', 'Neto', 'Monto', 'Cantidad', 'Precio', 'Total', 'MontoAbonado','MontoDocumento',
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
        } else {
          dataRow.push(row[key]);
        }
      })
      body.push(dataRow);
    });
    return body;
  }

  //?Suma los montos de una columna.
  /*
   * @params:
   *   tipoPago: Array de la columna.
   *   monto: Key de la colummna (prop).
   * @return:
   *   Monto acumulado.
   */
  sumarMontoRenglones(tipoPago: any, monto: any = 'Monto'): Number {
    let acum: Number = 0;
    tipoPago.forEach(element => {
      acum += element[monto];
  });
    return acum;
  }
}
