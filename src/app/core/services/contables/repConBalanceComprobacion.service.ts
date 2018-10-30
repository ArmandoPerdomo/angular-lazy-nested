import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import { RepConBalanceComprobacionIn } from '../../../abstract/DTO/in/reportesConBalance/repConBalanceComprobacionIn';
import { RepConBalanceComprobacionOut } from '../../../abstract/DTO/out/reportesContables/RepConBalanceComprobacion/RepConBalanceComprobacionOut';


  @Injectable()
  export class RepConBalanceComprobacionService {
    constructor(public http: HttpClient) {
    }
    // url del servicio
    url = environment.apiHost + 'ConstrutodoWsMvc/RepConBalanceComprobacion';

    // Petición POST del servicio RepAdmformatos
    repBalanceComp(repCon: RepConBalanceComprobacionIn): Observable < RepConBalanceComprobacionOut > {
      const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
      return this.http.post < RepConBalanceComprobacionOut > (this.url, JSON.stringify(repCon), {
        headers: headers
      });
    }



  }
