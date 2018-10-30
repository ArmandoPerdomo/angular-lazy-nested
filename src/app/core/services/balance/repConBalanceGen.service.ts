import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../../../environments/environment';;
import { RepConBalanceGeneralIn } from '../../../abstract/DTO/in/reportesConBalance/repConBalanceGenIn';
import { RepConBalanceGeneralOut } from '../../../abstract/DTO/out/reportesContables/RepConBalanceGeneral/RepConBalanceComprobacionOut';

  @Injectable()
  export class RepConBalanceGeneralService {
    constructor(public http: HttpClient) {
    }
    // url del servicio
    //! URL NO ESTA DOCUMENTADA
    url = environment.apiHost + 'ConstrutodoWsMvc/RepConBalanceGeneral';


    // Petición POST del servicio RepAdmformatos

    repGeneral(repadmin: RepConBalanceGeneralIn): Observable < RepConBalanceGeneralOut > {
      const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
      return this.http.post < RepConBalanceGeneralOut > (this.url, JSON.stringify(repadmin), {
        headers: headers
      });
    }
  }
