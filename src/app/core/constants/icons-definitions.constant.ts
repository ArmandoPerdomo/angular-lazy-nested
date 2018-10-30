/**
 * [Los regulares deben ser llamados] as far*** (font awesome regular)
 * [Los solidos debe ser llamados as fas] as fas*** (font awesome solid)
 * Para definir un estandar de la iconografía
 * 
 * Evita esto
 * import { fas } from '@fortawesome/free-solid-svg-icons';
 * import { far } from '@fortawesome/free-regular-svg-icons'; 
 * No queremos llenar el bundle de toda la iconografía de fontawesome, solo 
 * los que sean necesarios para la app
 * 
 * @ejem
 * import {faStar as fasStar} from '@fortawesome/free-solid-svg-icons'; //solid icons
 * 
 * @implmentacion
 * <fa-icon [icon]="['fas','star']" size="lg"></fa-icon>
 * ->[prefix, iconName]<-
 * 
 * @tutorial https://github.com/FortAwesome/angular-fontawesome#usage
 * 
 */

import { 
    faBook as fasBook,
    faExchangeAlt as fasExchangeAlt,
    faCog as fasCog,
    faHome as fasHome,
    faBars as fasBars,
    faCalculator as fasCalculator,
    faAngleLeft as fasAngleLeft,
    faUniversity as fasUniversity,
    faUser as fasUser,
    faChartLine as fasChartLine,
    faAngleDown as fasAngleDown,
    faCube as fasCubes,
    faHandHoldingUsd as fasHandHoldingUsd,
    faUserCircle as fasUserCircle,
    faLock as fasLock,
    faHourglassEnd as fasHourglassEnd,
    faClone as fasClone,
    faWifi as fasWifi,
    faUserSlash as fasUserSlash
} from '@fortawesome/free-solid-svg-icons';

import { 
    faCalendar as farCalendar
} from '@fortawesome/free-regular-svg-icons';

const ICONS : any = [
    fasBook,
    fasExchangeAlt,
    fasCog,
    fasHome,
    fasBars,
    farCalendar,
    fasCalculator,
    fasAngleLeft,
    fasUniversity,
    fasUser,
    fasChartLine,
    fasAngleDown,
    fasCubes,
    fasHandHoldingUsd,
    fasUserCircle,
    fasLock,
    fasHourglassEnd,
    fasClone,
    fasWifi,
    fasUserSlash
];
export const ICONS_DEFINITIONS = ICONS;