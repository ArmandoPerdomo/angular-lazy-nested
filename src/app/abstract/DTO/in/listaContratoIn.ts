import { ListaConsultarTablaIn } from "./listaConsultarTablaIn";
import { Empresa } from "../../class/user";

export class ListaContratoIn extends ListaConsultarTablaIn {

    constructor(){   
        const Empresa : Empresa = JSON.parse(localStorage.getItem('user_data')).empresa
        super();
        this.Cod_Empresa = Empresa.codigoNomina;
        this.Name_Tabla = "sncont";
        this.Campo1 = "co_cont";
        this.Campo2 = "des_cont";
        this.Condicion= "";
        this.Autentication = "";
    }
}