import { Injectable } from '@angular/core';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBarDismiss, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';

@Injectable()
export class UIComponentsService {

    constructor(public snack: MatSnackBar){}

    /**
     * @desc para definir un servicio para mostrar snackbars desde
     * cualquier componente
     * 
     * @returns Observable<MatSnackBarDismiss>
     * nos podemos suscribir a este observable si necesitamos
     * obtener el evento cuando se cerró el snack 
     * 
     * @param message tipea un mensaje de de vizualización
     * @param undoMsg mensaje que saldrá en la visual del botón para cerrar si no se define no saldrá el botón
     * @param delayTime tiempo de expiración del modal por defecto tiene 2seg
     * @param xPosition posición horizontal del snackbar
     * @param yPosition posición vertical de snackbar
     * 
     * @author Armando Perdomo
     */
    showSnackNotification(
        message: string, 
        undoMsg?: string, 
        delayTime?: number,
        xPosition?: MatSnackBarHorizontalPosition,
        yPosition?: MatSnackBarVerticalPosition
    ): Observable<MatSnackBarDismiss>{

        if(!message){
            throw new Error(`message: ${message} <= debe definir message \n 
            showSnackNotification('soy un bonito snack');`);
        }

        const duration = delayTime ? delayTime : 2000;
        const action = undoMsg ? undoMsg : null;
        const horizontalPosition: MatSnackBarHorizontalPosition = xPosition ? xPosition : 'end';
        const verticalPosition: MatSnackBarVerticalPosition = yPosition ? yPosition : 'top';

        return this.snack.open(message, action, {
            duration: duration,
            horizontalPosition: horizontalPosition,
            verticalPosition: verticalPosition,
            panelClass: ['construtodo-snackbar-notification']
        }).afterDismissed();
    }
}