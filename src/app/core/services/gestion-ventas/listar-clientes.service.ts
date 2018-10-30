import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListarClienteOut } from '../../../abstract/DTO/out/gestion-ventas/listarClientesOut';

@Injectable()
export class ListaClienteService {
  constructor(public http: HttpClient) { }
  // url del servicio
  url = 'WsProfitStreet/ListaClientes';

// Petición POST del servicio listar cliente
  asCli(): Observable<any> {
  const headers = new HttpHeaders().set('Content-Type' ,  'application/json;charset=utf-8');

  return this.http.post<ListarClienteOut>(this.url, {
    sCodigo_D: '',
    sCodigo_H: '',
    sCodigoEmpresa: 'AC01',
    sLikeCodigo: '',
    sLikeDescripcion: '',
    iTop: '5',
    sIdioma: 'ES-VE',
    bCoincidirCodDes: false,
    sAutenticador: 'Demo',
    } , {headers: headers});
  }

}
