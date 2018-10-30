import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import { ListaArticulosLineaIn } from '../../../abstract/DTO/in/listaArticulosLineaIn';
import { ListaArticulosLineaOut } from '../../../abstract/DTO/out/listaArticulosLinea/listaArticulosLineaOut';


@Injectable()
export class ListaArticulosLineaService {
constructor(public http: HttpClient) { }
url = environment.apiHost + 'ConstrutodoWsMvc/ConsultarTablas';
  // Peticion Post del servicio Lista factura
listaArticulosLinea(lista: ListaArticulosLineaIn): Observable<ListaArticulosLineaOut> {
const headers = new HttpHeaders().set('Content-Type' ,  'application/json;charset=utf-8');
return this.http.post < ListaArticulosLineaOut > (this.url, JSON.stringify(lista), {
  headers: headers
});

}

}
