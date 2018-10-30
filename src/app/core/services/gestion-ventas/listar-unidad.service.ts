import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListarUnidadOut } from '../../../abstract/DTO/out/gestion-ventas/listarUnidadOut';
import { ListarUnidadIn } from '../../../abstract/DTO/in/gestion-ventas/listarUnidadIn';

@Injectable()
export class ListaUnidadService{
    constructor(public http: HttpClient){}

    url ='WsProfitStreet/ListaUnidad';

    asUni(data: any): Observable<any>{
        const headers = new HttpHeaders().set('Content-Type' ,  'application/json;charset=utf-8');

        return this.http.post<ListarUnidadIn>(this.url,JSON.stringify(data),
        {
          headers: headers
        });
    }
}
