import { NgModule } from "@angular/core";
import { REPORTES_ROUTES } from "./reportes.routing";
import { RouterModule } from "@angular/router";
import { ReportesDashboardComponent } from './reportes-dashboard/reportes-dashboard.component';;
import { CommonModule } from "@angular/common";
import { PipesModule } from "../../core/pipes/pipes.module";
import { MonedaConstPipe } from "../../core/pipes/moneda-const.pipe";
import { DateConstPipe } from "../../core/pipes/date-const.pipe";
import { ListaAlmacenService } from "../../core/services/gestion-ventas/listar-almacen.service";
import { ListaClienteService } from "../../core/services/listas/listar-clientes.service";
import { ListaMonedaService } from "../../core/services/listas/lista-monedas.service";
import { NgbDateParserFormatter } from "@ng-bootstrap/ng-bootstrap";
import { NgbDateCustomParserFormatter } from "../../core/directives/NgbDateCustomParserFormatter";

@NgModule({
  imports: [
    CommonModule,
    PipesModule,
    RouterModule.forChild(REPORTES_ROUTES)
  ],
  declarations: [
    ReportesDashboardComponent
  ],
  providers: [
    MonedaConstPipe,
    DateConstPipe,
    ListaAlmacenService,
    ListaClienteService,
    ListaMonedaService,
    {
      provide: NgbDateParserFormatter,
      useClass: NgbDateCustomParserFormatter
    }
  ]
})
export class ReportesModule {}
