import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-date-construtodo',
  templateUrl: './date-construtodo.component.html',
  styleUrls: ['./date-construtodo.component.css']
})
export class DateConstrutodoComponent implements OnInit {
  today: String;

  @Input() form:FormGroup;
  @Input() nameControl:String;

 
 




  constructor() {
    
   
  
   }

  ngOnInit() {

    //this.today = new Date().toISOString().split('T')[0];
  }

}
