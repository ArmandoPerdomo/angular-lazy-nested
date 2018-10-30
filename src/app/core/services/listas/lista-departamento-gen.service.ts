import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ListaDepartamentoGenIn } from '../../../abstract/DTO/in/listaDepartamentoGenIn';
import { ListaDepartamentoOut } from '../../../abstract/DTO/out/listaDepartamento/listaDepartamentoOut';

@Injectable()
export class ListaDepartamentoGeneradoService {
constructor(public http: HttpClient) { }
url = environment.apiHost + 'ConstrutodoWsMvc/ConsultarTablas';
  // Peticion Post del servicio Lista factura
listaDepGen(lista: ListaDepartamentoGenIn): Observable<ListaDepartamentoOut> {
const headers = new HttpHeaders().set('Content-Type' ,  'application/json;charset=utf-8');
return this.http.post < ListaDepartamentoOut > (this.url, JSON.stringify(lista), {
  headers: headers
});

}

}
