import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {Lista} from "../../../../abstract/DTO/out/listaTipo1/lista";
import { ListaTipo1Out } from '../../../../abstract/DTO/out/listaTipo1/listaTipo1Out';

@Injectable()
export class ListaGraficaService {
constructor(public http: HttpClient) { }

listPeriodoA(): Observable<ListaTipo1Out> {
  let items = this.getMockPeriodoA();
  return of(items);
}

getMockPeriodoA() {
  let lista: ListaTipo1Out = new ListaTipo1Out();
  lista.Lista.push(new Lista('1','Últimos días (7)'));
  lista.Lista.push(new Lista('2','Último mes (1)'));
  lista.Lista.push(new Lista('3','Último año (1)'));
  lista.sMensajeError = null;
  return lista;
}

listPeriodo(): Observable<ListaTipo1Out> {
  let items = this.getMockPeriodo();
  return of(items);
}

getMockPeriodo() {
  let lista: ListaTipo1Out = new ListaTipo1Out();
  lista.Lista.push(new Lista('1','Últimos días (7)'));
  lista.Lista.push(new Lista('2','Últimas semanas (5)'));
  lista.Lista.push(new Lista('3','Últimos meses (12)'));
  lista.Lista.push(new Lista('4','Últimos años (10)'));
  lista.sMensajeError = null;
  return lista;
}

listTypeChart(): Observable<ListaTipo1Out> {
  let items = this.getMockTypeChart();
  return of(items);
}
getMockTypeChart() {
  let lista: ListaTipo1Out = new ListaTipo1Out();
  lista.Lista.push(new Lista('bar','Barra'));
  lista.Lista.push(new Lista('pie','Circular'));
  lista.Lista.push(new Lista('line','Líneas'));
  lista.sMensajeError = null;
  return lista;
}
}
