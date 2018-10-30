import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListaFacturaOut } from '../../abstract/DTO/out/listaFacturas/listaFacturaOut';
import { FormGroup } from '@angular/forms';

@Injectable()
export class FormControlService {
constructor(public http: HttpClient) { }

  // Peticion Post del servicio Lista factura
  public markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
     control.markAsDirty();

      if (control.controls) {
        control.controls.forEach(c => this.markFormGroupTouched(c));
      }
    });
  }
}
