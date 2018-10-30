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


  @Injectable()
  export class RepConBalanceGeneralService {
    constructor(public http: HttpClient) {
    }
    // url del servicio
    url = environment.apiHost + 'ConstrutodoWsMvc/RepConBalanceGeneral';


    // Petición POST del servicio RepAdmformatos

    /*repBalanceComp(reppresta: RepConConBalanceGenIn): Observable < RepConBalanceG > {
      const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
      return this.http.post < RepConBalanceG > (this.url, JSON.stringify(reppresta), {
        headers: headers
      });
    }*/
  }
