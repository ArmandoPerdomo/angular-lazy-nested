import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import { ListaArticulosAlmacenIn } from '../../../abstract/DTO/in/listaArticulosAlmacenIn';
import { ListaArticulosAlmacenOut } from '../../../abstract/DTO/out/listaArticulosAlmacen/listaArticulosAlmacen';

@Injectable()
export class ListaArticulosAlmacenService {
constructor(public http: HttpClient) { }
url = environment.apiHost + 'ConstrutodoWsMvc/ConsultarTablas';
  // Peticion Post del servicio Lista factura
listaArticulosAlmacen(lista: ListaArticulosAlmacenIn): Observable<ListaArticulosAlmacenOut> {
const headers = new HttpHeaders().set('Content-Type' ,  'application/json;charset=utf-8');
return this.http.post < ListaArticulosAlmacenOut > (this.url, JSON.stringify(lista), {
  headers: headers
});

}

}
