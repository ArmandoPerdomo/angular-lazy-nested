import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListaFacturaOut } from '../../../abstract/DTO/out/listaFacturas/listaFacturaOut';
import { RepAdmFacturaResumenCompletoOut } from '../../../abstract/DTO/out/reportesAdmVentas/repAdmFacturaResumenCompleto/repAdmFacturaResumenCompleto';
import { environment } from '../../../../environments/environment';
import { RepAdmFacturaResumenCompletoIn } from '../../../abstract/DTO/in/reportesAdmVentas/repAdmFacturaResumenCompleto';

@Injectable()
export class RepAdmFacturaResumenCompletoService {
constructor(public http: HttpClient) { }
url = environment.apiHost + 'ConstrutodoWsMvc/RepAdmFacturaResumenCompleto';
  // Peticion Post del servicio Lista factura
listFacturaAdmin(repfactcompleto: RepAdmFacturaResumenCompletoIn): Observable<RepAdmFacturaResumenCompletoOut> {
const headers = new HttpHeaders().set('Content-Type' ,  'application/json;charset=utf-8');
return this.http.post<RepAdmFacturaResumenCompletoOut> (this.url, JSON.stringify(repfactcompleto), {headers: headers});
  }

}
