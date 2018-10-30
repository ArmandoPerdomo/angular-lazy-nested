import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListarArticulosOut } from '../../../abstract/DTO/out/gestion-ventas/listarArticulosOut';

@Injectable()
export class ListaArt{
    constructor(public http : HttpClient){}

    url = 'WsProfitStreet/ListaArt';

    asArt(): Observable<any>{
        const headers = new HttpHeaders().set('Content-Type' ,  'application/json;charset=utf-8');

        return this.http.post<ListarArticulosOut>(this.url,{
            sCodigo_D: '',
            sCodigo_H: '',
            sCodigoEmpresa: 'AC01',
            sLikeCodigo: '0',
            sLikeDescripcion: '',
            iTop: '25',
            sIdioma: 'ES-VE',
            sAutenticador: 'Demo',

        }, {headers: headers});

    }
}
