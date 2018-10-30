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
import { RepNomEstCuentaPrestacionesIn } from '../../../abstract/DTO/in/reportesNomina/repNomEstCuentaPrestacionesIn';
import { RepNomEstCuentaPrestacionesOut } from '../../../abstract/DTO/out/reportesNomina/repNomEstCuentaPrestaciones/repNomEstCuentaPrestacionesOut';


  @Injectable()
  export class RepEdoCuentaPrestacionesService {
    constructor(public http: HttpClient) {
    }
    // url del servicio
    url = environment.apiHost + 'ConstrutodoWsMvc/RepNomEstadoCuentasPrestaciones';


    // Petición POST del servicio RepAdmformatos

    repNomPrestaciones(reppresta: RepNomEstCuentaPrestacionesIn): Observable < RepNomEstCuentaPrestacionesOut > {
      const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
      return this.http.post < RepNomEstCuentaPrestacionesOut > (this.url, JSON.stringify(reppresta), {
        headers: headers
      });
    }
  }
