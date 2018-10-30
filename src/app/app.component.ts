import { Component, OnInit } from '@angular/core';
import { Globals } from './core/services/globals.service';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    
  }

  loading: Boolean = false;
  constructor(public global: Globals) {
    this.global.currentLoading.subscribe(loading => setTimeout(()  => {this.loading = loading},0));
  }

}
