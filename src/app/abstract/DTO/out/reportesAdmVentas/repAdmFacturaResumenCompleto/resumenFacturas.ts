import { Documentos } from "./resumenFacturas/documentos";
import { ResumenCantida } from "./resumenFacturas/resumenCantida";
import { ResumenCxc } from "./resumenFacturas/resumenCxc";

export class ResumenFactura{
    Cliente: String;
    Vendedor: String;
    Trasporte: String;
    FacturaNum: Number;
    Documentos: Array<Documentos>;
    ResumenCantida: Array<ResumenCantida>;
    ResumenCxc: ResumenCxc;
}