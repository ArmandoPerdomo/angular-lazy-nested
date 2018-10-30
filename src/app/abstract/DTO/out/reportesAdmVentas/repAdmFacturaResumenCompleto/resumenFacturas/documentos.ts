import { DetalleDocumentos } from "./documentos/detalleDocumentos";

export class Documentos {
    TipoDocumento: String;
    NumeroDocumento: Number;
    FechaEmision: Number;
    FechaVencimiento: Number;
    Iva: Number;
    Sub_Total: Number;
    Total: Number;
    DetalleDocumentos: Array<DetalleDocumentos>;
}