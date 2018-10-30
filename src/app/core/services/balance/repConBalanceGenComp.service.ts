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
  import { RepAdmDisponibilidadIn } from '../../../abstract/DTO/in/reporteAdmCajaBlanco/repAdmDisponibilidadIn';
  import { RepAdmCxPPorProveedorOut } from '../../../abstract/DTO/out/reportesAdmCompras/repAdmCxPPorProveedor/repAdmCxPPorProveedorOut';

  @Injectable()
  export class RepConBalanceGenCompService {
    constructor(public http: HttpClient) {
    }
    // url del servicio
    //! URL NO ESTA DOCUMENTADA
    url = environment.apiHost + 'ConstrutodoWsMvc/RepConBalanceComprobacion';


    // Petición POST del servicio RepAdmformatos

    repCom(repadmin: RepAdmDisponibilidadIn): Observable < RepAdmCxPPorProveedorOut > {
      const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
      return this.http.post < RepAdmCxPPorProveedorOut > (this.url, JSON.stringify(repadmin), {
        headers: headers
      });
    }
  }
