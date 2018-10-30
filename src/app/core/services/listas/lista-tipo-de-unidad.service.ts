import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {environment} from "../../../../environments/environment";

import {Lista} from "../../../abstract/DTO/out/listaTipo1/lista";
import { ListaTipo1Out } from '../../../abstract/DTO/out/listaTipo1/listaTipo1Out';



@Injectable()
export class ListaTipoDeUnidadService {
constructor(public http: HttpClient) { }
url = environment.apiHost + 'WsProfitStreet/ListaCondiciones';



listaTipoUnidad(): Observable<ListaTipo1Out> {
    let items = this.getMockUnidad();
    return of(items);
  }

getMockUnidad() {

  let lista: ListaTipo1Out = new ListaTipo1Out();
  lista.Lista.push(new Lista("Unidad Primaria",'Unidad Primaria'));
  lista.Lista.push(new Lista("Unidad Secundaria",'Unidad Secundaria'));
  lista.Lista.push(new Lista("Unidad Alternativa 1 ",'Unidad Alternativa 1'));
  lista.Lista.push(new Lista("Unidad Alternativa 2",'Unidad Alternativa 2'));
  lista.Lista.push(new Lista("Unidad Original",'Unidad Original'));
  lista.sMensajeError = null;
  return lista;

}

}
