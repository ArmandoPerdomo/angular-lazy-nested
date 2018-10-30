import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ReporteAuditoriaGenIn } from '../../../abstract/DTO/in/reportesGerencial/reporteAuditoriaGenIn';
import { reporteAuditoriaGenOut } from '../../../abstract/DTO/out/reportesGerencial/reporteAuditoriaGen/reporteAuditoriaGenOut';


@Injectable()
export class RepGenAuditoriaGenService {
  constructor(public http: HttpClient) {
  
  }
  // url del servicio
  url = environment.apiConstrutodo + 'api/v1/reportes/auditoria/general';


  // Petición POST del servicio RepAdmformatos
//JSON.stringify(repGen) ,
  repGenAuditoriaGen(repGen: ReporteAuditoriaGenIn): Observable<HttpResponse<reporteAuditoriaGenOut>>{
    let params = new HttpParams();

    params = params.append('tiempo', repGen.tiempo.toString());

    const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
    return this.http.get < reporteAuditoriaGenOut > (this.url,  {
      observe: 'response',
      headers: headers,
      params: params
    });
  }
}
