import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ListaTrabajadoresIn } from '../../../abstract/DTO/in/listaTrabajadoresIn';
import { ListaTrabajadoresOut } from '../../../abstract/DTO/out/listaTrabajadores/listaTrabajadoresOut';
import { RepEstadoCuentasPrestacionesResult } from '../../../abstract/DTO/out/reportesNomina/repNomEstCuentaPrestaciones/RepEstadoCuentasPrestacionesResult/RepEstadoCuentasPrestacionesResult';
import { Resultado } from '../../../abstract/DTO/out/listaConsultarTablas/consultarTablasResult/resultado';


@Injectable()
export class ListaTrabajadoresService {
constructor(public http: HttpClient) { }
url = environment.apiHost + 'ConstrutodoWsMvc/ConsultarTablas';
  // Peticion Post del servicio Lista factura
listaTrabajadores(listatrab: ListaTrabajadoresIn): Observable<ListaTrabajadoresOut> {
const headers = new HttpHeaders().set('Content-Type' ,  'application/json;charset=utf-8');
return this.http.post < ListaTrabajadoresOut > (this.url, JSON.stringify(listatrab), {
  headers: headers
});

}

rangoTrabajadoresEdoCuentasPrestaciones(listatraresult: RepEstadoCuentasPrestacionesResult): Observable<ListaTrabajadoresOut> {
  let lista: ListaTrabajadoresOut = new ListaTrabajadoresOut();

  //console.log(lista);
    listatraresult.Prestaciones.forEach(element => {
    let result: Resultado = new Resultado(element.Co_Empleado.toString(), element.SNombre.toString());
    lista.ConsultarTablasResult.Resultado.push(result);
    });
    //console.log(lista);
  return of(lista);
  }
}


