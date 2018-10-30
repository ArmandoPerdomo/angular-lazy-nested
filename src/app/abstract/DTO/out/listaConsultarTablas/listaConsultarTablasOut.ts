import { ConsultarTablasResult } from "./consultarTablasResult/consultarTablasResult";

export class ListaConsultarTablasOut {
    ConsultarTablasResult: ConsultarTablasResult;
    constructor(){
        this.ConsultarTablasResult = new ConsultarTablasResult();
    }

}
