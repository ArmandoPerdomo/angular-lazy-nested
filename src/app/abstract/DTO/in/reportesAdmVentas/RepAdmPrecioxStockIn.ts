import { Empresa } from "../../../class/user";

export class RepAdmPrecioxStockIn{

Co_Emp: String;
Co_art_D: String;
Co_art_h: String;
Art_des_D: String;
Art_des_h: String;
Linea_D: String;
Linea_h: String;
Sub_linea_D: String;
Sub_linea_h: String;
Categoria_D: String;
Categoria_h: String;
Precio: String;
Autenticacion: String;


constructor(){
    const Empresa : Empresa = JSON.parse(localStorage.getItem('user_data')).empresa
    this.Co_Emp= Empresa.codigoAdministrativo;
    this.Co_art_D= "";
    this.Co_art_h= "";
    this.Art_des_D= "";
    this.Art_des_h= "";
    this.Linea_D= "";
    this.Linea_h= "";
    this.Sub_linea_D= "";
    this.Sub_linea_h= "";
    this.Categoria_D= "";
    this.Categoria_h= "";
    this.Precio= "";
    this.Autenticacion= "";
}
}