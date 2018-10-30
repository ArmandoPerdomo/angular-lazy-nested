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
import { repConGananciasYPerdidasIn } from '../../../abstract/DTO/in/reportesConBalance/repConGananciasYPerdidasIn';
import { RepConGananciasyPerdidasOut } from '../../../abstract/DTO/out/reportesContables/RepConGananciasyPerdidas/RepConGananciasyPerdidasOut';


  @Injectable()
  export class RepConGananciasyPerdidasService {
    constructor(public http: HttpClient) {
    }
    // url del servicio
    url = environment.apiHost + 'ConstrutodoWsMvc/RepConGananciasyPerdidas';


    // Petición POST del servicio RepAdmformatos

    repGananciasyPerdidas(repganyper: repConGananciasYPerdidasIn): Observable < RepConGananciasyPerdidasOut > {
      const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
      return this.http.post < RepConGananciasyPerdidasOut > (this.url, JSON.stringify(repganyper), {
        headers: headers
      });
    }
  }
