import {
  Injectable
} from '@angular/core';
import {
  HttpClient,
  
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import {
  Observable
} from 'rxjs';
import {
  RepAdmFormatosOut
} from '../../../abstract/DTO/out/reportes/repAdmFormatos/repAdmFormatos';
import {
  RepAdmFormatosIn
} from '../../../abstract/DTO/in/reportes/repAdmFormatosIn';
import { environment } from '../../../../environments/environment';

@Injectable()
export class RepAdmFormatosService {
  constructor(public http: HttpClient) {
   //! Aqui estan varios reportes de ventas y compras

   //TODO: LOS TIPOS DE SERVICIO ESTAN AQUI
   //*? COMPRAS
    /*

  NOTA_R": Nota de Recepcion
  ORDENC": Ordenes de Compra
  COMPRAS": Facturas de Compra
  DEV_PROV": Devolucion a Preoveedor
  COTIZ_P = Cotizacion a Proverrdor

    */
   //*VENTAS
    /*

    DEV_CLI = Devolucion de clientes
    COTIZ_C= CORIZACIONES
    DEV_CLI_AUX  = Plantilla devolucion
    PEDIDO = Pedido
    NOTA_E  =  Nota de entrega
    NOTA_D  =  NOTA de Despacho
    PLAVENT": Plantilla de Ventas
    FACT = Factura

    */

  }
  // url del servicio
  url = environment.apiHost + 'ConstrutodoWsMvc/RepAdmFormatos';


  // Petición POST del servicio RepAdmformatos

  repDev(repadmin: RepAdmFormatosIn): Observable < RepAdmFormatosOut > {
    const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
    return this.http.post < RepAdmFormatosOut > (this.url, JSON.stringify(repadmin), {
      headers: headers
    });
  }
}
