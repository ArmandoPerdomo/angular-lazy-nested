import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {environment} from "../../../../environments/environment";
import {ListaTipoOut} from "../../../abstract/DTO/out/listaTipo/listaTipoOut";
import {Lista} from "../../../abstract/DTO/out/listaTipo/lista";



@Injectable()
export class ListaTipoService {
constructor(public http: HttpClient) { }
url = environment.apiHost + 'WsProfitStreet/ListaCondiciones';



listaTipoCxCCliente(): Observable<ListaTipoOut> {
    let items = this.getMockCxCCliente();
    return of(items);
  }

getMockCxCCliente() {

  let lista: ListaTipoOut = new ListaTipoOut();
  lista.Lista.push(new Lista("1",'Nota de Credito'));
  lista.Lista.push(new Lista("2",'Nota de Debito'));
  lista.Lista.push(new Lista("3",'Factura'));
  lista.Lista.push(new Lista("4",'Ajuste negativo manual'));
  lista.Lista.push(new Lista("5",'Ajuste negativo automatico'));
  lista.Lista.push(new Lista("6",'Ajuste positivo manual'));
  lista.Lista.push(new Lista("7",'Ajuste positivo automatico'));
  lista.Lista.push(new Lista("8",'Cheque Devuelto'));
  lista.Lista.push(new Lista("9",'Adelanto'));
  lista.sMensajeError = null;
  return lista;

}

}
