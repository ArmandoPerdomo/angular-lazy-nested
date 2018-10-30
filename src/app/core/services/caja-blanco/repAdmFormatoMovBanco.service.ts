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
import { environment } from '../../../../environments/environment';
import { RepAdmFormatoMovBancoIn } from '../../../abstract/DTO/in/reporteAdmCajaBlanco/repAdmFormatoMovBancoIn';
import { RepAdmFormatoMovBancoOut } from '../../../abstract/DTO/out/reportesAdmCajaBlanco/repAdmMovBanco/repAdmMovBancoOut';

@Injectable()
export class RepAdmFormatoMovBancoService {
  constructor(public http: HttpClient) {
   // //console.log('SERVICIOOOOOOOOOO  REPORTEEEEEEEEEEEEEEEE');
  }
  // url del servicio
  url = environment.apiHost + 'ConstrutodoWsMvc/RepAdmFormatoMovBanco';


  // Petición POST del servicio RepAdmformatos

  repFormatoMovBanco(repformatomovbanco: RepAdmFormatoMovBancoIn): Observable < RepAdmFormatoMovBancoOut > {
    const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
    return this.http.post < RepAdmFormatoMovBancoOut > (this.url, JSON.stringify(repformatomovbanco), {
      headers: headers
    });
  }
}
