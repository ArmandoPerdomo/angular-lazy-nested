import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { RepAdminImagenIn } from '../../../abstract/DTO/in/reportesAdmVentas/repAdminImagenIn';
import { repAdminImagenOut } from '../../../abstract/DTO/out/reportesAdmVentas/repAdminImagenOut/repAdminImagenOut';

@Injectable()
export class RepAdminImagenServices {
  constructor(public http: HttpClient) {
  }
  // url del servicio
  url = environment.apiHost + 'ConstrutodoWsMvc/repadminimagen';
 // url = environment.apiHost + 'repadminimagen';


  // Petición POST del servicio RepAdmformatos

  repImg(repadmin: RepAdminImagenIn): Observable < repAdminImagenOut > {
    const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
    return this.http.post < repAdminImagenOut > (this.url, JSON.stringify(repadmin), {
      headers: headers
    });
  }
}
