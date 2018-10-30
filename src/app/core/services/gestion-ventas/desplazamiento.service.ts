import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { DesplazamientoOut } from '../../../abstract/DTO/out/gestion-ventas/desplazamientoOut';

@Injectable()
export class DesplazamientoService{
    constructor(public http : HttpClient){}

    url ='WsProfitStreet/Desplamiento';

    asDesplaz(tabla: String, cod: String, opc: Number,ref: String, vend: String ) : Observable<any>{
        const headers = new HttpHeaders().set('Content-Type' ,  'application/json;charset=utf-8');

        return this.http.post<DesplazamientoOut>(this.url,{
            sTabla: tabla,
            sCodigoEmpresa: cod,
            iOpcion: opc,
            sReferencia: ref ,
            sIdioma: 'ES-VE',
            sVendedor:vend,
            iSoloProcesable: 0,
            sAutenticador: '',
        }, {headers: headers});
    }
}
