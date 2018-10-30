import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'dConst'})

export class DateConstPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (args == "fullstring"){
      return this.pad(value.year)+this.pad(value.month)+this.pad(value.day);
    }else{
      if (value != null){
        var ano = value.substring(0,4);
        var mes = value.substring(4,6);
        var dia = value.substring(6,8);
        return dia + "/" + mes + "/" + ano;
      }else
      return null;
      }
    }
  pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
  }

}
