import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetPlantillaVentaOut } from '../../../abstract/DTO/out/gestion-ventas/getPlantillaVentaOut';
import { GetPlantillaVentaIn } from '../../../abstract/DTO/in/gestion-ventas/getPlantillaVentaIn';

@Injectable()
export class GetPlantillaVentaService{

    constructor(public http : HttpClient){}

    url ='WsProfitStreet/GetPlantillaVenta';

    asGetPlantV(plantV: GetPlantillaVentaOut): Observable< GetPlantillaVentaIn>{
        const headers = new  HttpHeaders().set('Content-Type' ,  'application/json;charset=utf-8');

        return this.http.post<GetPlantillaVentaIn>(this.url,JSON.stringify(plantV), {headers: headers});
    }
}
