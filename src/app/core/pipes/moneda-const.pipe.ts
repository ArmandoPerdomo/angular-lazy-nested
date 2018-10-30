import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'mConst'})

export class MonedaConstPipe implements PipeTransform {

  transform(value: any, args?: any): any {
  return new Intl.NumberFormat('es-ve', {minimumFractionDigits:2}).format(value);
  }
}
