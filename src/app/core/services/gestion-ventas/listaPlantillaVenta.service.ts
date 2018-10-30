import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListaPlantillaVentaOut } from '../../../abstract/DTO/out/gestion-ventas/listaPlantillaVentaOut';

@Injectable()
export class ListaPlantillaVentaService{

    constructor(public http: HttpClient){}

    url ="WsProfitStreet/ListaPlantillaVenta";

    asListaPlan(data: any): Observable<any>{
        const headers = new HttpHeaders().set('Content-Type' ,  'application/json;charset=utf-8');

        return this.http.post<ListaPlantillaVentaOut>(this.url,JSON.stringify(data), {headers: headers});
    }

}
