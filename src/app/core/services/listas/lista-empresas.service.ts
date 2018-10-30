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
import {
  RepAdmFormatosOut
} from '../../../abstract/DTO/out/reportes/repAdmFormatos/repAdmFormatos';
import {
  RepAdmFormatosIn
} from '../../../abstract/DTO/in/reportes/repAdmFormatosIn';

import { environment } from '../../../../environments/environment';
import { ListaEmpresasIn } from '../../../abstract/DTO/in/listaEmpresasIn';
import { ListaEmpresasOut } from '../../../abstract/DTO/out/listaEmpresas/listaEmpresasOut';

@Injectable()
export class ListaEmpresaService {
  constructor(public http: HttpClient) {
    //console.log('SERVICIO LISTA');

  }
  // url del servicio
  url = environment.apiHost + 'WsProfitStreet/ListaEmpresas';

  listaEmp(listein: ListaEmpresasIn): Observable < ListaEmpresasOut > {
    const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
    return this.http.post < ListaEmpresasOut> (this.url, JSON.stringify(listein), {
      headers: headers
    });
  }
}

