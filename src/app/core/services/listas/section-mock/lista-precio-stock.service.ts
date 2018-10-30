import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {Lista} from "../../../../abstract/DTO/out/listaTipo1/lista";
import { ListaTipo1Out } from '../../../../abstract/DTO/out/listaTipo1/listaTipo1Out';

@Injectable()
export class ListaPrecioStockService {
constructor(public http: HttpClient) { }

  listaPrecio(): Observable<ListaTipo1Out> {
    let items = this.getMockPrecio();
    return of(items);
  }
  getMockPrecio() {
    let lista: ListaTipo1Out = new ListaTipo1Out();
    lista.Lista.push(new Lista('Precio Unitario 1','Precio Unitario 1'));
    lista.Lista.push(new Lista('Precio Unitario 2','Precio Unitario 2'));
    lista.Lista.push(new Lista('Precio Unitario 3','Precio Unitario 3'));
    lista.Lista.push(new Lista('Precio Unitario 4','Precio Unitario 4'));
    lista.Lista.push(new Lista('Precio Unitario 5','Precio Unitario 5'));
    lista.sMensajeError = null;
    return lista;
  }
}
