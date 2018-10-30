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
import { RepAdmDisponibilidadIn } from '../../../abstract/DTO/in/reporteAdmCajaBlanco/repAdmDisponibilidadIn';
import { RepAdmDisponibilidadOut } from '../../../abstract/DTO/out/reportesAdmCajaBlanco/repAdmDisponibilidad/repAdmDisponibilidadOut';

@Injectable()
export class RepAdmDisponibilidadService {
  constructor(public http: HttpClient) {
   // //console.log('SERVICIOOOOOOOOOO  REPORTEEEEEEEEEEEEEEEE');
  }
  // url del servicio
  url = environment.apiHost + 'ConstrutodoWsMvc/RepAdmDisponibilidad';


  // Petición POST del servicio RepAdmformatos

  repDis(repadmin: RepAdmDisponibilidadIn): Observable < RepAdmDisponibilidadOut > {
    const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
    return this.http.post < RepAdmDisponibilidadOut > (this.url, JSON.stringify(repadmin), {
      headers: headers
    });
  }
}
