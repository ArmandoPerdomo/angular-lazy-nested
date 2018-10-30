import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListarVendedorOut } from '../../../abstract/DTO/out/gestion-ventas/listarVendedorOut';

@Injectable()
export class ListarVendedorService{

  constructor(public http: HttpClient){}

  // url del servicio
  url = 'WsProfitStreet/ListaVendedor';

  // Petición POST del servicio listar cliente
  asVend(): Observable<any>{

    const headers = new HttpHeaders().set('Content-Type' ,  'application/json;charset=utf-8');

    return this.http.post<ListarVendedorOut>(this.url, {
      sCodigo_D: '',
      sCodigo_H: '',
      sCodigoEmpresa: 'AC01',
      sLikeCodigo: '',
      sLikeDescripcion: '',
      iTop: '5',
      sIdioma: 'ES-VE',
      sAutenticador: 'Demo',
      } ,
      {
        headers: headers
      });
    }
}

