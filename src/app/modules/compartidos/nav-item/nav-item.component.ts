import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NavItem } from '../../../abstract/interfaces/nav-item.interface';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.css']
})
export class NavItemComponent implements OnInit {


  @Input() items: NavItem[];
  @ViewChild('childMenu') public childMenu;

  constructor() { }

  ngOnInit() {
  }

}
