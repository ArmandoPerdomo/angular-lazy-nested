import { Injectable } from '@angular/core';
  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { Observable } from 'rxjs/Observable';
  import { environment } from '../../../../environments/environment';
import { RepConConBalanceGenCompOut } from '../../../abstract/DTO/out/reportesContables/RepConBalanceGeneralComparativo/RepConConBalanceGenCompOut';
import { RepConConBalanceGenCompIn } from '../../../abstract/DTO/in/reportesConBalance/repConBalanceGenCompIn';


  @Injectable()
  export class RepConBalanceGeneralCompService {
    constructor(public http: HttpClient) {
    }
    // url del servicio
    url = environment.apiHost + 'ConstrutodoWsMvc/RepConBalanceGeneralComparativo';


    // Petición POST del servicio RepAdmformatos

    repBalanceGenComp(repbalance: RepConConBalanceGenCompIn): Observable < RepConConBalanceGenCompOut > {
      const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
      return this.http.post < RepConConBalanceGenCompOut > (this.url, JSON.stringify(repbalance), {
        headers: headers
      });
    }
  }
