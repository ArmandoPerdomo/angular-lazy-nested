import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ListaTrabajadoresIn } from '../../../abstract/DTO/in/listaTrabajadoresIn';
import { ListaTrabajadoresOut } from '../../../abstract/DTO/out/listaTrabajadores/listaTrabajadoresOut';


@Injectable()
export class ListaArticulosService {
constructor(public http: HttpClient) { }
url = environment.apiHost + 'ConstrutodoWsMvc/ConsultarTablas';
  // Peticion Post del servicio Lista factura
listaArticulos(listatrab: ListaTrabajadoresIn): Observable<ListaTrabajadoresOut> {
const headers = new HttpHeaders().set('Content-Type' ,  'application/json;charset=utf-8');
return this.http.post < ListaTrabajadoresOut > (this.url, JSON.stringify(listatrab), {
  headers: headers
});

}

}
