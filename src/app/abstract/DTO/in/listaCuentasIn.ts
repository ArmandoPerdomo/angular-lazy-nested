import { ListaConsultarTablaIn } from "./listaConsultarTablaIn";
import { Empresa } from "../../class/user";

export class ListaCuentasIn extends ListaConsultarTablaIn {

    constructor(){   const Empresa : Empresa = JSON.parse(localStorage.getItem('user_data')).empresa
        super();
        this.Cod_Empresa = Empresa.codigoAdministrativo;
        this.Name_Tabla = "cuentas";
        this.Campo1 = "cod_cta";
        this.Campo2 = "num_cta";
        this.Condicion= "";
        this.Autentication = "";
    }
}
