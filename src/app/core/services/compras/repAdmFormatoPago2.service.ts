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
import { RepAdmFormatoPago2Out } from '../../../abstract/DTO/out/reportesAdmCompras/repAdmFormatoPago2/repAdmFormatoPago2Out';
import { RepAdmFormatoPago2In } from '../../../abstract/DTO/in/reporteAdmCompras/repAdmFormatoPago2In';

@Injectable()
export class RepAdmFormatoPago2Service { //! Compra pago digital
  constructor(public http: HttpClient) {
  }
  // url del servicio
  url = environment.apiHost + 'ConstrutodoWsMvc/RepAdmFormatoPago2';

  // Petición POST del servicio RepAdmformatos
  repPago2(repadmin: RepAdmFormatoPago2In): Observable < RepAdmFormatoPago2Out > {
    const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
    return this.http.post < RepAdmFormatoPago2Out > (this.url, JSON.stringify(repadmin), {
      headers: headers
    });
  }
}
