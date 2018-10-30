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
import { RepAdmMovBancoxNumeroIn } from '../../../abstract/DTO/in/reporteAdmCajaBlanco/repAdmMovBancoxNumeroIn';
import { RepAdmMovBancoxNumeroOut } from '../../../abstract/DTO/out/reportesAdmCajaBlanco/repAdmMovBancoxNumero/repAdmMovBancoxNumeroOut';

@Injectable()
export class RepAdmMovBancoxNumeroService {
  constructor(public http: HttpClient) {
   // //console.log('SERVICIOOOOOOOOOO  REPORTEEEEEEEEEEEEEEEE');
  }
  // url del servicio
  url = environment.apiHost + 'ConstrutodoWsMvc/RepAdmMovBancoxNumero';


  // Petición POST del servicio RepAdmformatos

  repBancoxNumero(repbanconumero: RepAdmMovBancoxNumeroIn): Observable < RepAdmMovBancoxNumeroOut > {
    const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
    return this.http.post < RepAdmMovBancoxNumeroOut > (this.url, JSON.stringify(repbanconumero), {
      headers: headers
    });
  }
}
