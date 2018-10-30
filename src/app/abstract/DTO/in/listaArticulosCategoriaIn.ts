import { ListaConsultarTablaIn } from "./listaConsultarTablaIn";
import { Empresa } from "../../class/user";

export class ListaArticulosCategoriaIn extends ListaConsultarTablaIn {

    constructor(){   
        const Empresa : Empresa = JSON.parse(localStorage.getItem('user_data')).empresa
        super();
        this.Cod_Empresa = Empresa.codigoAdministrativo;
        this.Name_Tabla = "cat_art";
        this.Campo1 = "co_cat";
        this.Campo2 = "cat_des";
        this.Condicion= "";
        this.Autentication = "";
    }
}