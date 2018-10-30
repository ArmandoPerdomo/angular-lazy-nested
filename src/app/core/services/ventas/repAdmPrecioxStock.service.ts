import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { RepAdmPrecioxStockOut } from '../../../abstract/DTO/out/reportesAdmVentas/repAdmPrecioxStockOut/repAdmPrecioxStockOut';
import { RepAdmPrecioxStockIn } from '../../../abstract/DTO/in/reportesAdmVentas/RepAdmPrecioxStockIn';


@Injectable()
export class RepAdmPrecioxStockServices {
  constructor(public http: HttpClient) {
  }
  // url del servicio
  url = environment.apiHost + 'ConstrutodoWsMvc/RepAdmPrecioxStock';
 // url = environment.apiHost + 'RepAdmPrecioxStock';


  // Petición POST del servicio RepAdmformatos

  repDev(repadmin: RepAdmPrecioxStockIn): Observable < RepAdmPrecioxStockOut > {
    const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
    return this.http.post < RepAdmPrecioxStockOut > (this.url, JSON.stringify(repadmin), {
      headers: headers
    });
  }
}
