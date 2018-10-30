import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { graficoGerencialIn } from '../../../abstract/DTO/in/reportesGerencial/reporteAdministrativoTesoreriaIn';
import { GrafigoGerencialOut } from '../../../abstract/DTO/out/reportesGerencial/reporteAdministrativo/graficoGerencialOut';
import { reporteGerenciaGrafFavOut } from '../../../abstract/DTO/out/reportesGerencial/reporteAdministrativo/reporteGerenciaGrafFavOut';

  @Injectable()
  export class RepGerencialFavService {
    constructor(public http: HttpClient) {
     }

    url = `${environment.apiConstrutodo}api/v1/privates/`;

    addToFavorites(rep: graficoGerencialIn): Observable < HttpResponse<GrafigoGerencialOut> > {
      return this.http.post<GrafigoGerencialOut>(this.url+'grafico-favorito',rep,{observe: 'response'})
    }

    loadFavorites(idusuario: number): Observable <reporteGerenciaGrafFavOut> {
      const params = new HttpParams().append('idusuario', idusuario.toString());
       return this.http.get<reporteGerenciaGrafFavOut>(this.url+'graficos-favoritos',{
        params: params
      });
    }

    loadOneFavorite(id): Observable <reporteGerenciaGrafFavOut> {
      let params = new HttpParams();
      params = params.append('id', id);
      return this.http.get<reporteGerenciaGrafFavOut>(this.url+'grafico-favorito',{
        params: params
      });
    }

  }