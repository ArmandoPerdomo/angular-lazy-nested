import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetStocActualkArtOut } from '../../../abstract/DTO/out/gestion-ventas/getStocActualkArtOut';
import { GetStocActualkArtIn } from '../../../abstract/DTO/in/gestion-ventas/getStocActualkArtIn';

@Injectable()
export class GetStocActualkArtService{
    constructor(public http: HttpClient) { }

    url ='WsProfitStreet/GetArticulo';

    asStockActual(data: GetStocActualkArtOut) : Observable<any>{

        const headers = new  HttpHeaders().set('Content-Type' ,  'application/json;charset=utf-8');

        return this.http.post<GetStocActualkArtIn>(this.url,JSON.stringify(data), {headers: headers});
    }
}
