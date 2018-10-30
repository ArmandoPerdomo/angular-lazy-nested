import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListaArticuloAyudaIn } from '../../../abstract/DTO/in/gestion-ventas/listaArticuloAyudaIn';
import { ListaArticuloAyudaOut } from '../../../abstract/DTO/out/gestion-ventas/ListaArticuloAyudaOut';

@Injectable()
export class ListaArticuloAyudaService{

    constructor(public http: HttpClient){}

    url ='WsProfitStreet/ListaArticuloAyuda';

    asListaArtAyuda(lista : ListaArticuloAyudaOut): Observable<ListaArticuloAyudaIn>{
        console.log("entro");

        const headers = new  HttpHeaders().set('Content-Type' ,  'application/json;charset=utf-8');

        return this.http.post<ListaArticuloAyudaIn>(this.url,JSON.stringify(lista), {headers: headers});
    }
}
