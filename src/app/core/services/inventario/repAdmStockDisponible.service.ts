import {
  Injectable
} from '@angular/core';
import {
  HttpClient,
  
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import {
  Observable
} from 'rxjs';
import {
  RepAdmFormatosOut
} from '../../../abstract/DTO/out/reportes/repAdmFormatos/repAdmFormatos';
import {
  RepAdmFormatosIn
} from '../../../abstract/DTO/in/reportes/repAdmFormatosIn';
import { environment } from '../../../../environments/environment';
import { RepAdmStockDisponibleOut } from '../../../abstract/DTO/out/reportesAdmInventario/repAdmStockDisponible/repAdmStockDisponibleOut';
import { RepAdmStockDisponibleIn } from '../../../abstract/DTO/in/reportesAdmInventario/repAdmStockDisponibleIn';

@Injectable()
export class RepAdmStockDisponibleService {
  constructor(public http: HttpClient) {
  }
  // url del servicio
  url = environment.apiHost + 'ConstrutodoWsMvc/RepAdmStockDisponible';


  // Petición POST del servicio RepAdmformatos
  repCxP(repadmin: RepAdmStockDisponibleIn): Observable < RepAdmStockDisponibleOut > {
    const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
    return this.http.post < RepAdmStockDisponibleOut > (this.url, JSON.stringify(repadmin), {
      headers: headers
    });
  }
}
