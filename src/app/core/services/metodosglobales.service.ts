import { Injectable } from '@angular/core';

@Injectable()
export class MetodosGlobalesService {

  transformarMoneda(num:number):string{
    return new Intl.NumberFormat('es-ve', {minimumFractionDigits:2}).format(num);
  }

  

  stringToNumber(str:string):number{
    return Number(str)
  }
}