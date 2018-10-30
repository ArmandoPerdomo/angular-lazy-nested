import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ListaConceptoIn } from '../../../abstract/DTO/in/listaConceptoIn';
import { ListaConceptoOut } from '../../../abstract/DTO/out/listaConcepto/listaConceptoOut';

@Injectable()
export class ListaConceptoService {
constructor(public http: HttpClient) { }
url = environment.apiHost + 'ConstrutodoWsMvc/ConsultarTablas';
  // Peticion Post del servicio Lista factura
listaConcepto(lista: ListaConceptoIn): Observable<ListaConceptoOut> {
const headers = new HttpHeaders().set('Content-Type' ,  'application/json;charset=utf-8');
return this.http.post < ListaConceptoOut > (this.url, JSON.stringify(lista), {
  headers: headers
});

}

}
