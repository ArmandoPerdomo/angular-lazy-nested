import { Empresa } from "../../../class/user";

export class RepAdmStockDisponibleIn
{
    Co_Emp: String;
    Co_art_D: String;
    Co_art_H: String;
    Linea_D: String;
    Linea_h: String;
    Sub_linea_D: String;
    Sub_linea_h: String;
    Categoria_D: String;
    Categoria_h: String;
    Autenticacion: String;
    constructor(){   const Empresa : Empresa = JSON.parse(localStorage.getItem('user_data')).empresa
        this.Co_Emp= Empresa.codigoAdministrativo;
        this.Co_art_D= "";
        this.Co_art_H= "";
        this.Linea_D= "";
        this.Linea_h= "";
        this.Sub_linea_D= "";
        this.Sub_linea_h= "";
        this.Categoria_D= "";
        this.Categoria_h= "";
        this.Autenticacion= "";
    }
}