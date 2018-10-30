import { Encabezado } from "./encabezado/encabezado";
import { Renglones } from "./reglones/renglones";

// Data que se envia al Json del servicio para los reportes de Ventas
export class FormatosResult {
    Error: String;
    Encabezado : Encabezado;
    Renglones: Array<Renglones>;
  }
  