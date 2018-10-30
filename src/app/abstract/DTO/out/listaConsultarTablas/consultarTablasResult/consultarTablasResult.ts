import { Resultado } from "./resultado";

export class ConsultarTablasResult{
Error: String;
Resultado: Array<Resultado>;


constructor(){
    this.Error = "";
    this.Resultado = new Array<Resultado>();
}
}