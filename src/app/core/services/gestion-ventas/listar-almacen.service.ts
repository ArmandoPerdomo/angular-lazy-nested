import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListarAlmacenOut } from '../../../abstract/DTO/out/gestion-ventas/listarAlmacenOut';

@Injectable()
export class ListaAlmacenService{

    constructor(public http: HttpClient){}

    url ='WsProfitStreet/ListaAlmacen';

    asAlma(): Observable<any>{
        const headers = new HttpHeaders().set('Content-Type' ,  'application/json;charset=utf-8');

        return this.http.post<ListarAlmacenOut>(this.url,{
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
