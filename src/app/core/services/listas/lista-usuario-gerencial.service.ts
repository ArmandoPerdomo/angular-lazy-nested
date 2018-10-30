import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { listaUsuariosOut } from '../../../abstract/DTO/out/listaUsuarios/listaUsuariosOut';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListaUsuarioGerencialService {

  constructor(public http: HttpClient) {
  }
  // url del servicio
  url = environment.apiConstrutodo + 'api/v1/privates/';

  getUsers(id):Observable<HttpResponse<listaUsuariosOut>> {
    let params = new HttpParams();
 
    const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
    return this.http.get< listaUsuariosOut > (this.url+'empresa/'+id+'/usuarios',  {
      observe: 'response',
      headers: headers,
      params: params
    });
  }



    
}
