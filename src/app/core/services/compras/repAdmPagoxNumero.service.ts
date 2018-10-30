import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment } from '../../../../environments/environment';
import { RepAdmPagoxNumeroOut } from '../../../abstract/DTO/out/reportesAdmCompras/repAdmPagoxNumero/repAdmPagoxNumeroOut';
import { RepAdmPagoxNumeroIn } from '../../../abstract/DTO/in/reporteAdmCompras/repAdmPagoxNumeroIn';

@Injectable()
export class RepAdmPagoxNumeroService {
  constructor(public http: HttpClient) {
   // //console.log('SERVICIOOOOOOOOOO  REPORTEEEEEEEEEEEEEEEE');
  }
  // url del servicio
  url = environment.apiHost + 'ConstrutodoWsMvc/RepAdmPagoxNumero';


  // Petición POST del servicio RepAdmformatos
  repCxP(repadmin: RepAdmPagoxNumeroIn): Observable < RepAdmPagoxNumeroOut > {
    const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
    return this.http.post < RepAdmPagoxNumeroOut > (this.url, JSON.stringify(repadmin), {
      headers: headers
    });
  }


}
