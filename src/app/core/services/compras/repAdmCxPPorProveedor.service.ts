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
import { RepAdmCxPPorProveedorOut } from '../../../abstract/DTO/out/reportesAdmCompras/repAdmCxPPorProveedor/repAdmCxPPorProveedorOut';
import { RepAdmCxPPorProveedorIn } from '../../../abstract/DTO/in/reporteAdmCompras/repAdmCxPPorProveedorIn';

@Injectable()
export class RepAdmCxPPorProveedorService {
  constructor(public http: HttpClient) {
   // //console.log('SERVICIOOOOOOOOOO  REPORTEEEEEEEEEEEEEEEE');
  }
  // url del servicio
  url = environment.apiHost + 'ConstrutodoWsMvc/RepAdmCxPPorProveedor';


  // Petición POST del servicio RepAdmformatos

  repDev(repadmin: RepAdmCxPPorProveedorIn): Observable < RepAdmCxPPorProveedorOut > {
    const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
    return this.http.post < RepAdmCxPPorProveedorOut > (this.url, JSON.stringify(repadmin), {
      headers: headers
    });
  }
}
