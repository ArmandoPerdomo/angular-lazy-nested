import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { ListaSegmentoIn } from '../../../abstract/DTO/in/listaSegmentoIn';
import { ListaSegmentoOut } from '../../../abstract/DTO/out/listaSegmento/listaSegmentoOut';

@Injectable()
export class ListaSegmentosService {
constructor(public http: HttpClient) { }
url = environment.apiHost + 'WsProfitStreet/ListaSegmento';
  // Peticion Post del servicio Lista factura
listaSegmento(listasegmento: ListaSegmentoIn): Observable<ListaSegmentoOut> {
const headers = new HttpHeaders().set('Content-Type' ,  'application/json;charset=utf-8');
return this.http.post < ListaSegmentoOut > (this.url, JSON.stringify(listasegmento), {
  headers: headers
});

}

}
