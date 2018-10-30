import { ListaConsultarTablaIn } from "./listaConsultarTablaIn";
import { Empresa } from "../../class/user";

export class ListaConceptoIn extends ListaConsultarTablaIn {

    constructor(){   
        const Empresa : Empresa = JSON.parse(localStorage.getItem('user_data')).empresa
        super();
        this.Cod_Empresa = Empresa.codigoNomina;
        this.Name_Tabla = "snconcep";
        this.Campo1 = "co_conce";
        this.Campo2 = "des_conce";
        this.Condicion= "";
        this.Autentication = "";
    }
}