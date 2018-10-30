import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable, of } from 'rxjs';

import {Lista} from "../../../../abstract/DTO/out/listaTipo1/lista";
import { ListaTipo1Out } from '../../../../abstract/DTO/out/listaTipo1/listaTipo1Out';



@Injectable()
export class ListaEdoCuentaPrestamoService {
constructor(public http: HttpClient) { }
  listaFrecuencia(): Observable<ListaTipo1Out> {
    let items = this.getMockFrecuencia();
    return of(items);
  }
  getMockFrecuencia() {
    let lista: ListaTipo1Out = new ListaTipo1Out();
    lista.Lista.push(new Lista('Semanal','Semanal'));
    lista.Lista.push(new Lista('Quincenal','Quincenal'));
    lista.Lista.push(new Lista('Mensual','Mensual'));
    lista.Lista.push(new Lista('Pago Unico','Pago Unico'));
    lista.sMensajeError = null;
    return lista;
  }

  listaPagados(): Observable<ListaTipo1Out> {
    let items = this.getMockPagados();
    return of(items);
  }
  getMockPagados() {
    let lista: ListaTipo1Out = new ListaTipo1Out();
    lista.Lista.push(new Lista('Si','Si'));
    lista.Lista.push(new Lista('No','No'));
    lista.Lista.push(new Lista('Todos','Todos'));
    lista.sMensajeError = null;
    return lista;
  }

  listaMetodos(): Observable<ListaTipo1Out> {
    let items = this.getMockMetodos();
    return of(items);
  }
  getMockMetodos() {
    let lista: ListaTipo1Out = new ListaTipo1Out();
    lista.Lista.push(new Lista('Francos','Francos'));
    lista.Lista.push(new Lista('Americano Simple','Americano Simple'));

    lista.sMensajeError = null;
    return lista;
  }
}
