import { ListaConsultarTablaIn } from "./listaConsultarTablaIn";
import { Empresa } from "../../class/user";

export class ListaProveedoresIn extends ListaConsultarTablaIn {

    constructor(){   const Empresa : Empresa = JSON.parse(localStorage.getItem('user_data')).empresa
        super();
        this.Cod_Empresa = Empresa.codigoAdministrativo;
        this.Name_Tabla = "prov";
        this.Campo1 = "co_prov";
        this.Campo2 = "prov_des";
        this.Condicion= "";
        this.Autentication = "";
    }
}