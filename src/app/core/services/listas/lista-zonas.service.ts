import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ListaZonasIn } from '../../../abstract/DTO/in/listaZonasIn';
import { ListaZonaOut } from '../../../abstract/DTO/out/listaZona/listaZonaOut';

@Injectable()
export class ListaZonasService {
constructor(public http: HttpClient) { }
url = environment.apiHost + 'WsProfitStreet/ListaZona';
  // Peticion Post del servicio Lista factura
listaZona(listazona: ListaZonasIn): Observable<ListaZonaOut> {
const headers = new HttpHeaders().set('Content-Type' ,  'application/json;charset=utf-8');
return this.http.post < ListaZonaOut > (this.url, JSON.stringify(listazona), {
  headers: headers
});

}

}
