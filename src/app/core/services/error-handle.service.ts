import { ErrorHandler, Injectable, Injector} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { UIComponentsService } from './ui-components.service';

/**
 * 
 * ErrorsHandler
 * 
 * Esta clase que implementa a la interfaz de ErrorHandler
 * que nos provee Angular para el manejo de errores en consola
 * 
 * La función principal de esta clase es tomar en cuenta los errores
 * que pueden ocurrir en la aplicación para así llevar un control de ellas
 * 
 * @author Armando Perdomo
 */
@Injectable()
export class ErrorsHandler implements ErrorHandler {

    constructor(private injector: Injector){}

    handleError(error: Error | HttpErrorResponse | DOMException) {

        const ui = this.injector.get(UIComponentsService);

        if (error instanceof HttpErrorResponse) {
            if (!navigator.onLine) {
            // Si no existe conexión a internet
            ui.showSnackNotification('No existe conexión a internet, por favor verifica tu conexión');
            console.error('No hay conexión a internet', error);
            } else {
            // HTTP errors (error.status === 403, 404...)
            ui.showSnackNotification('Error interno, al hacer una petición'); 
            console.error('Error en la petición',error);
            }
        } else if(error instanceof DOMException){
            ui.showSnackNotification('Error de comunicación, le recomendamos volver a iniciar sesión');
        }else {
            // Errores del app (Angular Error, ReferenceError...)
            ui.showSnackNotification('Angular Error, f12 para mas detalles'); 
            console.error('Angular Error:', error); 
        }
    }
}