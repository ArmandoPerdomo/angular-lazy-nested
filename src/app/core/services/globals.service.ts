import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';



@Injectable()
export class Globals {
private loadingSource = new BehaviorSubject<Boolean>(false);
currentLoading = this.loadingSource.asObservable();
  loading: Boolean = false;
  constructor() { 

    
  }

  showLoading(){
    this.loadingSource.next(true);
  }

  hideLoading(){
    this.loadingSource.next(false);
  }
 

}
  
