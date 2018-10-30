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
import { environment } from '../../../../environments/environment';
import { ReporteGerencialIn } from '../../../abstract/DTO/in/reportesGerencial/reporteGerencialIn';
import { reporteGerencialOut } from '../../../abstract/DTO/out/reportesGerencial/reporteGerencial/reporteGerencialOut';

@Injectable()
export class RepGenTodosAdminService {
  constructor(public http: HttpClient) {}
  // url del servicio
  url = environment.apiHost + 'ConstrutodoWsMvc/RepAdmReumenGerencial';


  // Petición POST del servicio RepAdmformatos

  repTodosAdmin(reptodosAdmin: ReporteGerencialIn): Observable < reporteGerencialOut > {
    const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
    return this.http.post < reporteGerencialOut > (this.url, JSON.stringify(reptodosAdmin) , {
      headers: headers
    });
  }
}
