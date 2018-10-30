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
import { RepNomEdoCtaUtilidadesIn } from '../../../abstract/DTO/in/reportesNomina/repNomEdoCtaUtilidadesIn';
import { RepNomEdoCtaUtilidadesOut } from '../../../abstract/DTO/out/reportesNomina/repNomEdoCtaUtilidades/repNomEdoCtaUtilidadesOut';

  @Injectable()
  export class RepNomEdoCtaUtilidadesService {
    constructor(public http: HttpClient) {
    }
    // url del servicio
    url = environment.apiHost + 'ConstrutodoWsMvc/RepNomEdoCtaUtilidades';


    // Petición POST del servicio RepAdmformatos

    repUtilidades(repUtilidades: RepNomEdoCtaUtilidadesIn): Observable < RepNomEdoCtaUtilidadesOut > {
      const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
      return this.http.post < RepNomEdoCtaUtilidadesOut > (this.url, JSON.stringify(repUtilidades), {
        headers: headers
      });
    }
  }
