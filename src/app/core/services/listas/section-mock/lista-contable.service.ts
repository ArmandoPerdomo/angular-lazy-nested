import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {Lista} from "../../../../abstract/DTO/out/listaTipo1/lista";
import { ListaTipo1Out } from '../../../../abstract/DTO/out/listaTipo1/listaTipo1Out';



@Injectable()
export class ListaContableService {
constructor(public http: HttpClient) { }
  listaNivel(): Observable<ListaTipo1Out> {
    let items = this.getMockNivel();
    return of(items);
  }
  getMockNivel() {
    let lista: ListaTipo1Out = new ListaTipo1Out();
    lista.Lista.push(new Lista('1','Nivel 1'));
    lista.Lista.push(new Lista('2','Nivel 2'));
    lista.Lista.push(new Lista('3','Nivel 3'));
    lista.Lista.push(new Lista('4','Nivel 4'));
    lista.Lista.push(new Lista('5','Nivel 5'));
    lista.Lista.push(new Lista('6','Nivel 6'));
    lista.Lista.push(new Lista('7','Nivel 7'));
    lista.Lista.push(new Lista('8','Nivel 8'));
    lista.Lista.push(new Lista('9','Nivel 9'));
    lista.Lista.push(new Lista('10','Nivel 10'));
    lista.sMensajeError = null;
    return lista;
  }

}
