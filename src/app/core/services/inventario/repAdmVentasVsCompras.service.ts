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
import { RepAdmVentasVsCompraIn } from '../../../abstract/DTO/in/reportesAdmInventario/repAdmVentasVsComprasIn';
import { RepAdmVentasVsComprasOut } from '../../../abstract/DTO/out/reportesAdmInventario/repAdmVentasVsCompras/repAdmVentasVsComprasOut';

@Injectable()
export class RepAdmVentasVsComprasService {
  constructor(public http: HttpClient) {
  }
  // url del servicio
  url = environment.apiHost + 'ConstrutodoWsMvc/RepAdmVentasVsCompras';


  // Petición POST del servicio RepAdmformatos
  repCxP(repadmin: RepAdmVentasVsCompraIn): Observable < RepAdmVentasVsComprasOut > {
    const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
    return this.http.post < RepAdmVentasVsComprasOut > (this.url, JSON.stringify(repadmin), {
      headers: headers
    });
  }
}
