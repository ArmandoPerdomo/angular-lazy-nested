import { ListaConsultarTablaIn } from "./listaConsultarTablaIn";
import { Empresa } from "../../class/user";

export class ListaArticulosAlmacenIn extends ListaConsultarTablaIn {

    constructor(){   
        const Empresa : Empresa = JSON.parse(localStorage.getItem('user_data')).empresa
        super();
        this.Cod_Empresa = Empresa.codigoAdministrativo;
        this.Name_Tabla = "sub_alma";
        this.Campo1 = "co_sub";
        this.Campo2 = "des_sub";
        this.Condicion= "";
        this.Autentication = "";
    }
}