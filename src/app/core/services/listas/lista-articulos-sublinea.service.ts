import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import { ListaArticulosSublineaIn } from '../../../abstract/DTO/in/listaArticulosSublineaIn';
import { ListaArticulosSublineaOut } from '../../../abstract/DTO/out/listaArticulosSublinea/listaArticulosSublineaOut';


@Injectable()
export class ListaArticulosSublineaService {
constructor(public http: HttpClient) { }
url = environment.apiHost + 'ConstrutodoWsMvc/ConsultarTablas';
  // Peticion Post del servicio Lista factura
listaArtSublinea(lista: ListaArticulosSublineaIn): Observable<ListaArticulosSublineaOut> {
const headers = new HttpHeaders().set('Content-Type' ,  'application/json;charset=utf-8');
return this.http.post < ListaArticulosSublineaOut > (this.url, JSON.stringify(lista), {
  headers: headers
});

}

}
