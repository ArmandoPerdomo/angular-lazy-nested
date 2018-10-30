import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ListaArticulosCategoriaIn } from '../../../abstract/DTO/in/listaArticulosCategoriaIn';
import { ListaArticulosCategoriaOut } from '../../../abstract/DTO/out/listaArticulosCategoria/listaArticulosCategoriaOut';
import { environment } from '../../../../environments/environment';


@Injectable()
export class ListaArticulosCategoriaService {
constructor(public http: HttpClient) { }
url = environment.apiHost + 'ConstrutodoWsMvc/ConsultarTablas';
  // Peticion Post del servicio Lista factura
listaCategoria(lista: ListaArticulosCategoriaIn): Observable<ListaArticulosCategoriaOut> {
const headers = new HttpHeaders().set('Content-Type' ,  'application/json;charset=utf-8');
return this.http.post < ListaArticulosCategoriaOut > (this.url, JSON.stringify(lista), {
  headers: headers
});

}

}
