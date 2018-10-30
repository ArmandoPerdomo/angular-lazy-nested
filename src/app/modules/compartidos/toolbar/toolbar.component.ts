import { Component, OnInit, Input } from '@angular/core';
import { HomeService } from '../../../core/services/home.services';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Input('mobileQuery') mobileQuery: MediaQueryList;
  sideBarToggled:Boolean;

  constructor(private hs: HomeService) { 
    this.hs.sideBarToggled.subscribe(toggle => this.sideBarToggled = toggle);
  }

  ngOnInit() {
  }

  toggleSideNav(): void{
    this.hs.toggleSidebar(!this.sideBarToggled);
  }

}
