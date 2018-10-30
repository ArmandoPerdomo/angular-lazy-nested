import { NgModule} from '@angular/core';
import { ComboContrutodoComponent } from './combo-contrutodo/combo-contrutodo.component';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateConstrutodoComponent } from './date-construtodo/date-construtodo.component';
import { GlobalContableComponentComponent } from './global-contable-component/global-contable-component.component';
import { GlobalGerencialComponent } from './global-gerencial-component/global-gerencial.component';
import { ChartsModule } from 'ng2-charts';
import { MaterialDesignModule } from '../../../core/UI/material-design/material-design.module';
import { PipesModule } from '../../../core/pipes/pipes.module';
import { GraficoFavComponent } from './global-gerencial-component/grafico-fav/grafico-fav.component';
import { GraficoComponent } from './global-gerencial-component/grafico/grafico.component';
import { MatTabsModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    NgSelectModule, 
    NgbModule, 
    FormsModule,
    ReactiveFormsModule,    
    ChartsModule,
    MatTabsModule,
    PipesModule,
    MaterialDesignModule
],
  entryComponents: [
    GraficoComponent,
    GraficoFavComponent
  ],
  declarations: [
    ComboContrutodoComponent, 
    DateConstrutodoComponent,
    GlobalContableComponentComponent,
    GlobalGerencialComponent, 
    GraficoFavComponent, 
    GraficoComponent],
  exports: [
    ComboContrutodoComponent,
    DateConstrutodoComponent, 
    GlobalContableComponentComponent, 
    GlobalGerencialComponent 
  ],
  providers: [
    NgbActiveModal,
  ]
})
export class ComponentsModule {}
