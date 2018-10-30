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
import {RepAdmFormatosCxcClientesIn} from "../../../abstract/DTO/in/reportesAdmVentas/repAdmFormatosCxCClientesIn";
import {RepAdmFormatosCxCClientesOut} from "../../../abstract/DTO/out/reportesAdmVentas/repAdmFormatosCxcClientesOut/repAdmFormatosCxcClientesOut";

@Injectable()
export class RepAdmFormatoCxCClientesService {
  constructor(public http: HttpClient) {
  }
  // url del servicio
  url = environment.apiHost + 'ConstrutodoWsMvc/RepAdmCxCPorCliente';


  // Petición POST del servicio RepAdmformatos

  repDev(repadmin: RepAdmFormatosCxcClientesIn): Observable < RepAdmFormatosCxCClientesOut > {
    const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
    return this.http.post < RepAdmFormatosCxCClientesOut > (this.url, JSON.stringify(repadmin), {
      headers: headers
    });
  }
}
