import { Proveedor } from "./Proveedor";





export class CxPPorProveedorResult{
    Error: String;
    Proveedor: Array<Proveedor>;

    constructor(){
        this.Proveedor = new Array<Proveedor>();
    }
}