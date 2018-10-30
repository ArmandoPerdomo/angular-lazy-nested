import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListarMonedaOut } from '../../../abstract/DTO/out/gestion-ventas/listarMonedaOut';

@Injectable()
export class ListarMonedaService{

    constructor(public http: HttpClient){}

    url='WsProfitStreet/ListaMoneda';

    asMone() : Observable<any>{

        const headers = new HttpHeaders().set('Content-Type' ,  'application/json;charset=utf-8');

        return this.http.post<ListarMonedaOut>(this.url,{
            sCodigo_Art: '',
            sCodigoEmpresa: 'AC01',
            sIdioma : 'ES-VE',
            sAutenticador : 'Demo',
        },{
            headers:headers
        })
    }
}
