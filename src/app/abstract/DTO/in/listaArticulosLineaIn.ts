import { ListaConsultarTablaIn } from "./listaConsultarTablaIn";
import { Empresa } from "../../class/user";

export class ListaArticulosLineaIn extends ListaConsultarTablaIn {

    constructor(){   
        const Empresa : Empresa = JSON.parse(localStorage.getItem('user_data')).empresa
        super();
        this.Cod_Empresa = Empresa.codigoAdministrativo;
        this.Name_Tabla = "Lin_art";
        this.Campo1 = "co_lin";
        this.Campo2 = "lin_des";
        this.Condicion= "";
        this.Autentication = "";
    }
}