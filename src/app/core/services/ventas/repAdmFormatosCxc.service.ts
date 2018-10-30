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
export class RepAdmFormatoCxCService {
  constructor(public http: HttpClient) {
   // //console.log('SERVICIOOOOOOOOOO  REPORTEEEEEEEEEEEEEEEE');
  }
  // url del servicio
  url = environment.apiHost + 'ConstrutodoWsMvc/RepAdmFormatoCxC';


  // Petición POST del servicio RepAdmformatos

  repDev(repadmin: RepAdmFormatosIn): Observable < RepAdmFormatosOut > {
    const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
    return this.http.post < RepAdmFormatosOut > (this.url, JSON.stringify(repadmin), {
      headers: headers
    });
  }
}
