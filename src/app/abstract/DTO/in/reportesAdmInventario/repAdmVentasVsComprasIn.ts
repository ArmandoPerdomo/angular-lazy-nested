import { Empresa } from "../../../class/user";




export class RepAdmVentasVsCompraIn{
Co_Emp: String;
Articulo_D: String;
Articulo_h: String;
Fecha_D: String;
Fecha_h: String;
Almacen_D: String;
Almacen_d: String;
Linea_D: String;
Linea_h: String;
Categoria_D: String;
Categoria_h: String;
Proveedor_D: String;
Proveedor_h: String;
ConMovimiento: String;
TipoUnidad: String;
Autenticacion: String;

constructor(){   const Empresa : Empresa = JSON.parse(localStorage.getItem('user_data')).empresa
        this.Co_Emp= Empresa.codigoAdministrativo;
        this.Articulo_D= "";
        this.Articulo_h= "";
        this.Fecha_D= "";
        this.Fecha_h= "";
        this.Almacen_D= "";
        this.Almacen_d= "";
        this.Linea_D= "";
        this.Linea_h= "";
        this.Categoria_D= "";
        this.Categoria_h= "";
        this.Proveedor_D= "";
        this.Proveedor_h= "";
        this.ConMovimiento= "";
        this.TipoUnidad= "";
        this.Autenticacion= "";
    }
}