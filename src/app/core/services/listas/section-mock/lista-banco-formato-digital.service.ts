import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable, of } from 'rxjs';

import {Lista} from "../../../../abstract/DTO/out/listaTipo1/lista";
import { ListaTipo1Out } from '../../../../abstract/DTO/out/listaTipo1/listaTipo1Out';
import { environment } from '../../../../../environments/environment';
import { ListaCuentasIn } from '../../../../abstract/DTO/in/listaCuentasIn';
import { ListaCuentasOut } from '../../../../abstract/DTO/out/listaCuentas/listaCuentasOut';
import { ListaCuentasIngresoIn } from '../../../../abstract/DTO/in/listaCuentasIngresoIn';
import { ListaCuentasIngresoOut } from '../../../../abstract/DTO/out/listaCuentasIngreso/listaCuentaIngresoOut';



@Injectable()
export class ListaBancoFormatoDigitalService {
constructor(public http: HttpClient) { }


url = environment.apiHost + 'ConstrutodoWsMvc/ConsultarTablas';
  // Peticion Post del servicio Lista factura
listaCuenta(lista: ListaCuentasIn): Observable<ListaCuentasOut> {
const headers = new HttpHeaders().set('Content-Type' ,  'application/json;charset=utf-8');
return this.http.post < ListaCuentasOut > (this.url, JSON.stringify(lista), {
  headers: headers
});

}
listaCuentaIngreso(lista: ListaCuentasIngresoIn): Observable<ListaCuentasIngresoOut> {
  const headers = new HttpHeaders().set('Content-Type' ,  'application/json;charset=utf-8');
  return this.http.post < ListaCuentasIngresoOut > (this.url, JSON.stringify(lista), {
    headers: headers
  });
  
  }
  listaOrigenMovimiento(): Observable<ListaTipo1Out> {
    let items = this.getMockOrigenM();
    return of(items);
  }
  listaConciliado(): Observable<ListaTipo1Out> {
    let items = this.getMockConciliado()
    return of(items);
  }
  listaTipoMov(): Observable<ListaTipo1Out> {
    let items = this.getTipoDeMovimiento();
    return of(items);
  }
    getMockOrigenM() {
    let lista: ListaTipo1Out = new ListaTipo1Out();
    lista.Lista.push(new Lista('','Todos'));
    lista.Lista.push(new Lista('Banco','Banco'));
    lista.Lista.push(new Lista('Caja ','Caja'));
    lista.Lista.push(new Lista('Cobro','Cobro'));
    lista.Lista.push(new Lista('Depósito','Depósito'));
    lista.Lista.push(new Lista('Orden de Pago','Orden de Pago'));
    lista.Lista.push(new Lista('Pago','Pago'));
    lista.Lista.push(new Lista('Cheque Devuelto','Cheque Devuelto'));
    lista.sMensajeError = null;
    return lista;
  }

   getMockConciliado() {
    let lista: ListaTipo1Out = new ListaTipo1Out();
    lista.Lista.push(new Lista('1','Todos'));
    lista.Lista.push(new Lista('2','Si'));
    lista.Lista.push(new Lista('3','No'));
    lista.sMensajeError = null;
    return lista;
  }
  getTipoDeMovimiento() {
    let lista: ListaTipo1Out = new ListaTipo1Out();
    lista.Lista.push(new Lista('Nota de Crédito','Nota de Crédito'));
    lista.Lista.push(new Lista('Nota de Débito','Nota de Débito'));
    lista.Lista.push(new Lista('Reversión de Crédito','Reversión de Crédito'));
    lista.Lista.push(new Lista('Depósito','Depósito'));
    lista.Lista.push(new Lista('Cheque','Cheque'));
    lista.Lista.push(new Lista('Interés','Interés'));
    lista.Lista.push(new Lista('Impuesto al Débito Bancario','Impuesto al Débito Bancario'));
    lista.Lista.push(new Lista('Transferencia (-)','Transferencia (-)'));
    lista.Lista.push(new Lista('','Todos'));
    lista.Lista.push(new Lista('Transferencia (+)','Transferencia (+)'));
    lista.sMensajeError = null;
    return lista;
  }
}
