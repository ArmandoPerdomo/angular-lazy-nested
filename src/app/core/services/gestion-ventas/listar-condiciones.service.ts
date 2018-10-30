import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListarCondicionesOut } from '../../../abstract/DTO/out/gestion-ventas/listarCondicionesOut';

@Injectable()
export class ListarCondicionesService{

    constructor(public http : HttpClient){}

    url = 'WsProfitStreet/ListaCondiciones';

    //Petición Post del servicio
    asCond() : Observable<any> {

        const headers = new HttpHeaders().set('Content-Type' ,  'application/json;charset=utf-8');

        return this.http.post<ListarCondicionesOut>(this.url,{
            sCodigo_D: '',
            sCodigo_H: '',
            sCodigoEmpresa: 'AC01',
            sLikeCodigo: '',
            sLikeDescripcion: '',
            iTop: '25',
            sIdioma: 'ES-VE',
            sAutenticador: 'Demo',
            } ,
            {headers: headers});
    }
}
