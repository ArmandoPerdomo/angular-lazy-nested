import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import { ListaContratoIn } from '../../../abstract/DTO/in/listaContratoIn';
import { ListaContratoOut } from '../../../abstract/DTO/out/listaContrato/listaContratoOut';
@Injectable()
export class ListaContratoService {
constructor(public http: HttpClient) { }
url = environment.apiHost + 'ConstrutodoWsMvc/ConsultarTablas';
  // Peticion Post del servicio Lista factura
listaContrato(lista: ListaContratoIn): Observable<ListaContratoOut> {
const headers = new HttpHeaders().set('Content-Type' ,  'application/json;charset=utf-8');
return this.http.post < ListaContratoOut > (this.url, JSON.stringify(lista), {
  headers: headers
});

}

}
