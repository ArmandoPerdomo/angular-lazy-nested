import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ReporteAuditoriaIndividualIn } from '../../../abstract/DTO/in/reportesGerencial/reporteAuditoriaIndividualIn';
import { reporteAuditoriaIndividualOut } from '../../../abstract/DTO/out/reportesGerencial/reporteAuditoriaIndividual/reporteAuditoriaIndividualOut';


@Injectable()
export class RepGenAuditoriaIndividualService {
  constructor(public http: HttpClient) {
  }
  // url del servicio
  url = environment.apiConstrutodo + 'api/v1/reportes/auditoria/individual';


  // Petición POST del servicio RepAdmformatos
//JSON.stringify(repgenIn) ,
  repGenIn(repgenIn: ReporteAuditoriaIndividualIn):Observable<HttpResponse<reporteAuditoriaIndividualOut>> {
    let params = new HttpParams();
    params = params.append('idusuario', repgenIn.idusuario.toString());
    params = params.append('tiempo', repgenIn.tiempo.toString());

    const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
    return this.http.get < reporteAuditoriaIndividualOut > (this.url,  {
      observe: 'response',
      headers: headers,
      params: params
    });
  }
}
