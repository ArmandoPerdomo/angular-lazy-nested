import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListarTransportesOut } from '../../../abstract/DTO/out/gestion-ventas/listarTransportesOut';

@Injectable()
export class ListarTransportesService {
  constructor(public http: HttpClient) { }
  // url del servicio
  url = 'WsProfitStreet/ListaTransportes';

// Petición POST del servicio listar transporte
  asTrans(): Observable<any> {
  const headers = new HttpHeaders().set('Content-Type' ,  'application/json;charset=utf-8');

  return this.http.post<ListarTransportesOut>(this.url, {
    sCodigo_D: '',
    sCodigo_H: '',
    sCodigoEmpresa: 'AC01',
    sLikeCodigo: '',
    sLikeDescripcion: '',
    iTop: '25',
    sIdioma: 'ES-VE',
    sAutenticador: 'Demo',
    } , {headers: headers});
  }

}
