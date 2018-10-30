import { ListaConsultarTablaIn } from "./listaConsultarTablaIn";
import { Empresa } from "../../class/user";

export class ListaCuentasIngresoIn extends ListaConsultarTablaIn {

    constructor(){   const Empresa : Empresa = JSON.parse(localStorage.getItem('user_data')).empresa
        super();
        this.Cod_Empresa = Empresa.codigoAdministrativo;
        this.Name_Tabla = "cta_ingr";
        this.Campo1 = "co_ingr";
        this.Campo2 = "descrip";
        this.Condicion= "";
        this.Autentication = "";
    }
}