import { Component, OnInit, Input } from '@angular/core';
import { HomeService } from '../../../core/services/home.services';
import { UserTokenService } from '../../../core/services/user-token.service';
import { Router } from '@angular/router';
import { User } from '../../../abstract/class/user';
import { NavItem } from '../../../abstract/interfaces/nav-item.interface';
import { CT_MENU_ITEMS } from '../../../core/constants/construtodo-menu-items.constant';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  menuType: String;
  userLogged: User;
  fullname: string;
  rederedNavMenu: NavItem[];

  constructor(
    private hs: HomeService,
    private userToken: UserTokenService,
    private router: Router
  ) {
    /**
     * Actualiza la información del menú
     * Menu type es actualizado cada vez que se
     * entra a un módulo 
     * Los módulos admitidos son 
     * Gestión, Reportes, Configuraciones, inicio
     */
    this.hs.menuType.subscribe(mt => {
      this.menuType = mt;
    });

    this.userLogged = this.userToken.getUserLogged();
    this.fullname = `${this.userLogged.nombre} ${this.userLogged.apellido}`;

    //this.rederedNavMenu = CT_MENU_ITEMS;
  }

  ngOnInit() {
  }

  doLogout(){
    this.router.navigate(['/login']);
  }
}
