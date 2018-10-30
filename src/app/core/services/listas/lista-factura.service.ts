import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListaFacturaOut } from '../../../abstract/DTO/out/listaFacturas/listaFacturaOut';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ListaFacturaService {
constructor(public http: HttpClient) { }
url = environment.apiHost + 'WsProfitStreet/ListaFactura';
  // Peticion Post del servicio Lista factura
listFactura(): Observable<ListaFacturaOut> {
const headers = new HttpHeaders().set('Content-Type' ,  'application/json;charset=utf-8');
return this.http.post<ListaFacturaOut> (this.url, {
    iNumero_: '0',
    iNumero_H: '125',
    iTop: '0',
    bSoloProcesable: '1',
    sCodigoEmpresa: 'AC01',
    sFecha_D: '20050101',	sFecha_H: '20180505',
    sCo_Vendedor: '',
    sIdioma: 'ES-VE',
    sAutenticador: ''}, {headers: headers});
  }
}
