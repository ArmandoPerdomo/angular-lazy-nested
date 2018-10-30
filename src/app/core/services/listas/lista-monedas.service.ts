import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ListaMonedasIn } from '../../../abstract/DTO/in/listaMonedasIn';
import { ListaMonedasOut } from '../../../abstract/DTO/out/listaMonedas/listaMonedasOut';

@Injectable()
export class ListaMonedaService {
constructor(public http: HttpClient) { }
url = environment.apiHost + 'WsProfitStreet/ListaMoneda';
  // Peticion Post del servicio Lista factura
listaMonedas(listamoneda: ListaMonedasIn): Observable<ListaMonedasOut> {
const headers = new HttpHeaders().set('Content-Type' ,  'application/json;charset=utf-8');
return this.http.post < ListaMonedasOut > (this.url, JSON.stringify(listamoneda), {
  headers: headers
});

}

}
