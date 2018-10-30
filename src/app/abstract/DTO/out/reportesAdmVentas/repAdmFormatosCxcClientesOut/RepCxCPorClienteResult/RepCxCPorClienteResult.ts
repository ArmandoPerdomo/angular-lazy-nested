import { Clientes } from "./Clientes";






export class RepCxCPorClienteResult{
    Error: String;
    Clientes: Array<Clientes>

    constructor(){
        this.Clientes = new Array<Clientes>(0);
    }
}