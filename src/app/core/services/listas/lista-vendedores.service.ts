import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ListaVendedoresIn } from '../../../abstract/DTO/in/listaVendedoresIn';
import { ListaVendedoresOut } from '../../../abstract/DTO/out/listaVendedores/listaVendedoresOut';


@Injectable()
export class ListaVendedoresService {
constructor(public http: HttpClient) { }
url = environment.apiHost + 'WsProfitStreet/ListaVendedor';
  // Peticion Post del servicio Lista factura
listaVendedores(listavendedor: ListaVendedoresIn): Observable<ListaVendedoresOut> {
const headers = new HttpHeaders().set('Content-Type' ,  'application/json;charset=utf-8');
return this.http.post < ListaVendedoresOut > (this.url, JSON.stringify(listavendedor), {
  headers: headers
});

}

}
