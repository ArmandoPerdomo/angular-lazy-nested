import {
  Injectable
} from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
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
import { RepAdmFormatosCobPagIn } from '../../../abstract/DTO/in/reportes/repAdmFormatosCobPagIn.';
import { RepAdmFormatosCobPagOut } from '../../../abstract/DTO/out/reportes/repAdmFormatosCobPag/repAdmFormatosCobPag';
import { environment } from '../../../../environments/environment';

@Injectable()
export class RepAdmFormatosCobPagService {
  constructor(public http: HttpClient) {
    //! COB PAG TIPO DE DOCUMENTO:
    //? VENTAS:
    //? COMPRA: PAGO
  }
  // url del servicio
  url = environment.apiHost + 'ConstrutodoWsMvc/RepAdmFormatosCobPag';


  //? Petición POST del servicio RepAdmformatos

  repDev(repadmincob: RepAdmFormatosCobPagIn): Observable < RepAdmFormatosCobPagOut > {
    const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
    return this.http.post < RepAdmFormatosCobPagOut > (this.url, JSON.stringify(repadmincob), {
      headers: headers
    });
  }

}
