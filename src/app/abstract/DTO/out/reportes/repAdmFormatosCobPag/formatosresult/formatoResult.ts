import { Encabezado } from "./encabezado/encabezado";
import { TipoPago } from "./tipoPago/tipoPago";
import { DocumentosAsociados } from "./documentosAsociados/documentosAsociados";

// Data que se envia al Json del servicio para los reportes de Ventas
export class FormatosCobPagResult {
    Error: String;
    Encabezado : Encabezado;
    TipoPago: Array<TipoPago>;
    DocumentosAsociados: Array<DocumentosAsociados>;
  }
  