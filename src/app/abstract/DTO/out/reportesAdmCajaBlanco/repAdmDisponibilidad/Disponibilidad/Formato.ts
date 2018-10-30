export class Formato{
    Co_Caja: String;
    Descrip: String;
    Monto_D: Number;
    Monto_H: Number;


    constructor(co_caja = "", descripcion = "", monto_d = 0, monto_h = 0){
        this.Co_Caja= co_caja;
        this.Descrip= descripcion;
        this.Monto_D= monto_d;
        this.Monto_H= monto_h;
    }
}
