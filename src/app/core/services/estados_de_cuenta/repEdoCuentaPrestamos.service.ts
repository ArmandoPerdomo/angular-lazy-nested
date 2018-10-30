import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { RepNomEstCuentaPrestamosIn } from '../../../abstract/DTO/in/reportesNomina/repNomEstCuentaPrestamosIn';
import { RepNomEstCuentaPrestamosOut } from '../../../abstract/DTO/out/reportesNomina/repNomEstCuentaPrestamos/repNomEstCuentaPrestamosOut';


  @Injectable()
  export class RepEdoCuentaPrestamosService {
    constructor(public http: HttpClient) {
    }
    // url del servicio
    url = environment.apiHost + 'ConstrutodoWsMvc/RepNomEdoCtaPrestamo';
    // Petición POST del servicio RepAdmformatos
    repNomPrestamos(repprestamos: RepNomEstCuentaPrestamosIn): Observable < RepNomEstCuentaPrestamosOut > {
      const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
      return this.http.post < RepNomEstCuentaPrestamosOut > (this.url, JSON.stringify(repprestamos), {
        headers: headers
      });
    }
  }
