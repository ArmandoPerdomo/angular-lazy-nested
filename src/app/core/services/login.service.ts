import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAuth } from '../../abstract/class/user-auth';
import { environment } from '../../../environments/environment';


@Injectable()
export class LoginService {

  constructor(public http: HttpClient) {}

  login(user: UserAuth): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${environment.apiConstrutodo}login`, user, {observe: 'response'});
  }

  logout(nombreusuario: string): Observable<HttpResponse<any>>{
    const param  = new HttpParams().set('nombreusuario',nombreusuario);
    return this.http.patch<any>(
      `${environment.apiConstrutodo}api/v1/privates/bitacora/actualizar`,
      null,
      {params: param, observe: 'response'}
    );
  }

  getBitacora(nombreusuario: string): Observable<HttpResponse<any>>{
    const param  = new HttpParams().set('nombreusuario',nombreusuario);
    return this.http.get<any>(
      `${environment.apiConstrutodo}api/v1/privates/bitacora`,
      {params: param, observe: 'response'}
    );
  }

}


