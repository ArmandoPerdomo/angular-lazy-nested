import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { of, Observable } from 'rxjs';
import {Lista} from "../../../abstract/DTO/out/listaTipo1/lista";
import { ListaTipo1Out } from '../../../abstract/DTO/out/listaTipo1/listaTipo1Out';



@Injectable()
export class ListaConMovimientosService {
constructor(public http: HttpClient) { }

listaTipoConMovimiento(): Observable<ListaTipo1Out> {
    let items = this.getMockConMovimiento();
    return of(items);
  }

getMockConMovimiento() {

  let lista: ListaTipo1Out = new ListaTipo1Out();
  lista.Lista.push(new Lista("Todos",'Todos'));
  lista.Lista.push(new Lista("Si",'Si'));
  lista.Lista.push(new Lista("No",'No'));

  lista.sMensajeError = null;
  return lista;

}

}
