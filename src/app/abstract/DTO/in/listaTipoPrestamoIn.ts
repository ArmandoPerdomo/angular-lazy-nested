import { ListaConsultarTablaIn } from "./listaConsultarTablaIn";
import { Empresa } from "../../class/user";

export class ListaTipoPrestamoIn extends ListaConsultarTablaIn {

    constructor(){   
        const Empresa : Empresa = JSON.parse(localStorage.getItem('user_data')).empresa
        super();
        this.Cod_Empresa = Empresa.codigoNomina;
        this.Name_Tabla = "sntipoprest";
        this.Campo1 = "co_tipoprest";
        this.Campo2 = "des_tipoprest";
        this.Condicion= "";
        this.Autentication = "";
    }
}