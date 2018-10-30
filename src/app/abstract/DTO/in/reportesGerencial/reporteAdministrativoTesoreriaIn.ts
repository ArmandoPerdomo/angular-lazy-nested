export class graficoGerencialIn{
    idusuario:number;
    nombre: String;
    imagen: String;
    periodo: String


    constructor(nombre: String, imagen:String, idusuario:number, periodo:String){
        this.nombre = nombre;
        this.imagen = imagen;
        this.idusuario = idusuario;
        this.periodo = periodo;
    }
}