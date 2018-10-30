import { NgModule} from '@angular/core';
import { DateConstPipe } from './date-const.pipe';
import { MonedaConstPipe } from './moneda-const.pipe';



@NgModule({

  declarations: [DateConstPipe, MonedaConstPipe],
  exports: [DateConstPipe, MonedaConstPipe]
})
export class PipesModule {}
