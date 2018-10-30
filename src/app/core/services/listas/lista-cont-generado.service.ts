import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ListaConGeneradoIn } from '../../../abstract/DTO/in/listaConGeneradoIn';
import { listaContGeneradoOut } from '../../../abstract/DTO/out/listaDepgenerado/listaDepGeneradoOut';

@Injectable()
export class ListaContGeneradoService {
constructor(public http: HttpClient) { }
url = environment.apiHost + 'ConstrutodoWsMvc/ConsultarTablas';
  // Peticion Post del servicio Lista factura
listaCon(lista: ListaConGeneradoIn): Observable<listaContGeneradoOut> {
const headers = new HttpHeaders().set('Content-Type' ,  'application/json;charset=utf-8');
return this.http.post < listaContGeneradoOut > (this.url, JSON.stringify(lista), {
  headers: headers
});

}

}
