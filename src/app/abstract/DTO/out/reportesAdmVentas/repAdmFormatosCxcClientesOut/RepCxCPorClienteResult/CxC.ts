





export class CxC{
    Tipo_doc: String;
    Nro_doc: Number;
    Fec_emis: String;
    Fec_venc: String;
    Comentario: String;
    Co_ven: String;
    Monto_net: Number;
    Saldo: Number;
    Anulado: Boolean;


    
        constructor(Tipo_doc = "",
        Nro_doc = null,
        Fec_emis = "",
        Fec_venc = "",
        Comentario = "",
        Co_Ven = "",
        Monto_net = 0,
        Saldo = 0,
        Anulado = false)
        {
            this.Tipo_doc = Tipo_doc;
            this.Nro_doc = Nro_doc;
            this.Fec_emis = Fec_emis;
            this.Fec_venc = Fec_venc;
            this.Comentario = Comentario;
            this.Co_ven = Co_Ven;
            this.Monto_net = Monto_net;
            this.Saldo = Saldo;
            this.Anulado = Anulado;
        }

}