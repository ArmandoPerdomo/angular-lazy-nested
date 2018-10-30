import {
    Injectable
  } from '@angular/core';
  import {
    HttpClient,
    HttpHeaders,
  } from '@angular/common/http';
  import {
    Observable
  } from 'rxjs/Observable';
  import { environment } from '../../../../environments/environment';
import { repConGananciasYPerdidasMesesIn } from '../../../abstract/DTO/in/reportesConBalance/repConGananciasYPerdidasCompIn';
import { RepConGananciasyPerdidasMesesOut } from '../../../abstract/DTO/out/reportesContables/RepConGananciasyPerdidasMeses/RepConGananciasyPerdidasMesesOut';


  @Injectable()
  export class RepConGananciasyPerdidasMesesService {
    constructor(public http: HttpClient) {
    }
    // url del servicio
    url = environment.apiHost + 'ConstrutodoWsMvc/RepConGananciasyPerdidasMeses';


    // Petición POST del servicio RepAdmformatos

    repConGananciasyPerdidas(reppresta: repConGananciasYPerdidasMesesIn): Observable < RepConGananciasyPerdidasMesesOut > {
      const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
      return this.http.post < RepConGananciasyPerdidasMesesOut > (this.url, JSON.stringify(reppresta), {
        headers: headers
      });
    }
  }
