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
import { RepNomReciboPagoIn } from '../../../abstract/DTO/in/reportesNomina/repNomReciboPagoIn';
import { RepNomReciboPagoOut } from '../../../abstract/DTO/out/reportesNomina/repNomReciboPago/repNomReciboPagoOut';

  @Injectable()
  export class RepNomReciboPagoService {
    constructor(public http: HttpClient) {
    }
    // url del servicio
    url = environment.apiHost + 'ConstrutodoWsMvc/RepNomReciboPago';


    // Petición POST del servicio RepAdmformatos

    repNomReciboPago(reprecibopago: RepNomReciboPagoIn): Observable < RepNomReciboPagoOut > {
      const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
      return this.http.post < RepNomReciboPagoOut > (this.url, JSON.stringify(reprecibopago), {
        headers: headers
      });
    }
  }
