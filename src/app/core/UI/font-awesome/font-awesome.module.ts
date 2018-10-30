/**
 * Fontawesome para angular
 * Como usar
 * https://github.com/FortAwesome/angular-fontawesome
 * Este es el nucleo del módulo UI para la iconografía
 * Los iconos deben ser definidos como constantes en 
 * @constant ICONS_DEFINITIONS
 * 
 */
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { ICONS_DEFINITIONS } from '../../constants/icons-definitions.constant';

library.add(ICONS_DEFINITIONS); //Importante

@NgModule({
  imports: [
    FontAwesomeModule
  ],
  exports:[
    FontAwesomeModule
  ]
})
export class FontAwesomeConstrutodoModule { }
