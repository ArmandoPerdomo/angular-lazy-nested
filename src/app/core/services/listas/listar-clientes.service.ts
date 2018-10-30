import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

import { ListarClienteOut } from '../../../abstract/DTO/out/listaClientes/listarClientesOut';
import { Lista } from '../../../abstract/DTO/out/listaClientes/lista';
import { environment } from '../../../../environments/environment';
import { ListarClientesIn } from '../../../abstract/DTO/in/listarClientesIn';
@Injectable()
export class ListaClienteService {
  constructor(public http: HttpClient) { }
  // url del servicio
  url = environment.apiHost + 'WsProfitStreet/ListaClientes';

// Petición POST del servicio listar cliente
  asCli(listcliente: ListarClientesIn): Observable<any> {

  const headers = new HttpHeaders().set('Content-Type','application/json;charset=utf-8');

  return this.http.post<ListarClienteOut>(this.url, JSON.stringify(listcliente) , {headers: headers});
    /*let items = this.getMockClient();

    return Observable.of(items);*/


  }



  getMockClient() {
    let lista: ListarClienteOut = new ListarClienteOut();
    let list : Lista = new Lista();
    let list2 : Lista = new Lista();
    list.sCodigo = "7237557";
    list.sDescripcion = "LEONARDO CAMPINS";
    lista.Lista.push(list);
    list2.sCodigo = "COR-001";
    list2.sDescripcion = "INGENIEROS ASOCIADOS ZULIANA C.A.";
    lista.Lista.push(list2);
 /* lista.Lista =  [{"sCodigo": "7237557 ", "sDescripcion": "LEONARDO CAMPINS"}
  , { "sCodigo": "COR-001 ", "sDescripcion": "INGENIEROS ASOCIADOS ZULIANA C.A."} ];*/
    lista.sMensajeError = null;

    return lista;

}

}
