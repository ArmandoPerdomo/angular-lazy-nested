import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ListaProveedoresIn } from '../../../abstract/DTO/in/listaProveedoresin';
import { ListaProveedoresOut } from '../../../abstract/DTO/out/listaProveedores/listaProveedoresOut';

@Injectable()
export class ListaProveedoresService {
constructor(public http: HttpClient) { }
url = environment.apiHost + 'ConstrutodoWsMvc/ConsultarTablas';
  // Peticion Post del servicio Lista factura
listaProveedores(listaprov: ListaProveedoresIn): Observable<ListaProveedoresOut> {
const headers = new HttpHeaders().set('Content-Type' ,  'application/json;charset=utf-8');
return this.http.post < ListaProveedoresOut > (this.url, JSON.stringify(listaprov), {
  headers: headers
});

}

}
