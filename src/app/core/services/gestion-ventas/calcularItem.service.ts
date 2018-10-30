import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CalcularItemOut } from '../../../abstract/DTO/out/gestion-ventas/calcularItemOut';

@Injectable()
export class CalcularItemService{
    constructor(public http: HttpClient){}

    url='WsProfitStreet/CalcularItem';

    asCalcularItem(monto: Number, desc: String, canti: Number, iva: String, empresa:String) : Observable<any>{
        const headers = new HttpHeaders().set('Content-Type' ,  'application/json;charset=utf-8');

        return this.http.post<CalcularItemOut>(this.url,{
            dMonto: monto,
            sDescuento: desc,
            dCantidad: canti,
            sTipoIva: iva,
            sCodigoEmpresa: empresa,
            sIdioma: 'ES-VE',
            sAutenticador: '',
        }, {headers: headers});
    }


}
