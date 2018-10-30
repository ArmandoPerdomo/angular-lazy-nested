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
import { ListaDocumentosIn } from '../../../abstract/DTO/in/listaDocumentosIn';
import { ListaDocumentosOut } from '../../../abstract/DTO/out/listaDocumentos/listaDocumentosOut';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ListaDocumentosService {
  constructor(public http: HttpClient) {
  }
  // url del servicio
  url = environment.apiHost + 'WsProfitStreet/ListaDocumentos';

  listaDev(listdocin: ListaDocumentosIn): Observable < ListaDocumentosOut > {
    //console.log('Listado IN que es out -.-', listdocin);
//    repDev(): Observable < RepAdmFormatosOut > {
    const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
    return this.http.post < ListaDocumentosOut > (this.url, JSON.stringify(listdocin), {
      headers: headers
    });
  }
}

