import { ListaConsultarTablaIn } from "./listaConsultarTablaIn";
import { Empresa } from "../../class/user";

export class ListaDepartamentoIn extends ListaConsultarTablaIn {

    constructor(){   
        const Empresa : Empresa = JSON.parse(localStorage.getItem('user_data')).empresa
        super();
        this.Cod_Empresa = Empresa.codigoNomina;
        this.Name_Tabla = "sndepart";
        this.Campo1 = "co_depart";
        this.Campo2 = "des_depart";
        this.Condicion= "";
        this.Autentication = "";
    }
}