import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SetPlantillaVentaIn } from '../../../abstract/DTO/in/gestion-ventas/setPlantillaVentaIn';

@Injectable()
export class SetPlantillaVentaService{

    constructor(public http : HttpClient){}

    url = 'WsProfitStreet/SetPlantillaVenta';

    asGuardarPlantillaV(plantilla : any): Observable<any>{
        console.log("plantilla",plantilla);
        const headers = new  HttpHeaders().set('Content-Type' ,  'application/json;charset=utf-8');
        return this.http.post<SetPlantillaVentaIn>(this.url,JSON.stringify(plantilla), {headers: headers});

    }

}
