import { ListaConsultarTablaIn } from "./listaConsultarTablaIn";
import { Empresa } from "../../class/user";

export class ListaTrabajadoresIn extends ListaConsultarTablaIn {

    constructor(){   const Empresa : Empresa = JSON.parse(localStorage.getItem('user_data')).empresa
        super();
        this.Cod_Empresa = Empresa.codigoNomina;
        this.Name_Tabla = "snemple";
        this.Campo1 = "cod_emp";
        this.Campo2 = "nombre_completo";
        this.Condicion= "";
        this.Autentication = "";
    }
}