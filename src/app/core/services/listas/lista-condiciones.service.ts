import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ListaCondicionesIn } from '../../../abstract/DTO/in/listaCondicionesIn';
import { ListaCondicionesOut } from '../../../abstract/DTO/out/listaCondiciones/listaCondicionesOut';
import { Lista } from '../../../abstract/DTO/out/listaCondiciones/lista';

@Injectable()
export class ListaCondicionesService {
constructor(public http: HttpClient) { }
url = environment.apiHost + 'WsProfitStreet/ListaCondiciones';
  // Peticion Post del servicio Lista factura
listaCondiciones(listacondiciones: ListaCondicionesIn): Observable<ListaCondicionesOut> {
const headers = new HttpHeaders().set('Content-Type' ,  'application/json;charset=utf-8');
return this.http.post < ListaCondicionesOut > (this.url, JSON.stringify(listacondiciones), {
  headers: headers
});

}
listaCondicionesPagoXNumero(): Observable<ListaCondicionesOut> {
    let items = this.getMockPagoXNumero();
    return of(items);
  }

getMockPagoXNumero() {

  let lista: ListaCondicionesOut= new ListaCondicionesOut();
  let list : Lista = new Lista();
  let list2 : Lista = new Lista();
  let list3 : Lista = new Lista();
  list.sCodigo = "1";
  list.sDescripcion = "Todas";
  lista.Lista.push(list);
  list2.sCodigo = "2";
  list2.sDescripcion = "Anulados(as)";
  lista.Lista.push(list2);
  list3.sCodigo = "3";
  list3.sDescripcion = "No Anulados(as)";
  lista.Lista.push(list3);
  lista.sMensajeError = null;
  return lista;

}

}
