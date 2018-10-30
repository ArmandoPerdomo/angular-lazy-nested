import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import { ListaTipoPrestamoIn } from '../../../abstract/DTO/in/listaTipoPrestamoIn';
import { ListaTipoPrestamoOut } from '../../../abstract/DTO/out/listaTipoPrestamo/listaTipoPrestamoOut';

@Injectable()
export class ListaTipoPrestamoService {
constructor(public http: HttpClient) { }
url = environment.apiHost + 'ConstrutodoWsMvc/ConsultarTablas';
  // Peticion Post del servicio Lista factura
listaTipoPrestamo(lista: ListaTipoPrestamoIn): Observable<ListaTipoPrestamoOut> {
const headers = new HttpHeaders().set('Content-Type' ,  'application/json;charset=utf-8');
return this.http.post < ListaTipoPrestamoOut > (this.url, JSON.stringify(lista), {
  headers: headers
});

}

}
