import { ListaConsultarTablaIn } from "./listaConsultarTablaIn";
import { Empresa } from "../../class/user";

export class ListaArticulosSublineaIn extends ListaConsultarTablaIn {

    constructor(){   
        const Empresa : Empresa = JSON.parse(localStorage.getItem('user_data')).empresa
        super();
        this.Cod_Empresa = Empresa.codigoAdministrativo;
        this.Name_Tabla = "sub_lin";
        this.Campo1 = "co_subl";
        this.Campo2 = "subl_des";
        this.Condicion= "";
        this.Autentication = "";
    }
}