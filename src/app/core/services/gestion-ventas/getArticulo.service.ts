import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetArticuloOut} from '../../../abstract/DTO/out/gestion-ventas/getArticuloOut';

@Injectable()
export class GetArticuloService{
    constructor(public http : HttpClient){}

    url ='WsProfitStreet/GetArticulo';

    asArt(codigo: String): Observable<any>{

        const headers = new  HttpHeaders().set('Content-Type' ,  'application/json;charset=utf-8');

        return this.http.post<GetArticuloOut>(this.url,{
            sCodigoEmpresa: "AC01",
            sCodigo: codigo ,
            sIdioma: "ES-VE",
            sAutenticador: "",
        }, {headers: headers});

    }
}
