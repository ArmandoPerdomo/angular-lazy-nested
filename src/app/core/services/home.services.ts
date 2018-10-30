import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Router, NavigationEnd, NavigationStart } from "@angular/router";

@Injectable()
export class HomeService{

    private sidebarSource = new BehaviorSubject<Boolean>(true);
    sideBarToggled = this.sidebarSource.asObservable();

    private routerLoadingBarSource = new BehaviorSubject<Boolean>(true);
    routerLoadingBarShow = this.routerLoadingBarSource.asObservable();

    private menuSource = new BehaviorSubject<String>('h');
    menuType =  this.menuSource.asObservable();

    constructor(private router: Router){
        this.updateMenuSourceBy(this.router);
    }

    /**
     * Actualiza el estado del sidebar
     * @param toggled true/false - open/closed
     * @author Armando Perdomo 
     */
    toggleSidebar(toggled:Boolean): void{
        this.sidebarSource.next(toggled);
    }

    /**
     * Actualiza el estado del loadBar
     * @param toggled true/false - active/inactive
     * @author Armando Perdomo 
     */
    toggleLoadBar(toggled:Boolean): void{
        this.routerLoadingBarSource.next(toggled);
    }

    /**
     * Actualiza la fuente del menú
     * dependiendo de la url y a los
     * eventos que nos estamos suscribiendo
     * definir si es
     * gestión, reportes, configuraciones, home
     * @param Router
     * @author Armando Perdomo
     */
    updateMenuSourceBy(router: Router){
        //deben ser declarados los tipos del menú
        const statments: Array<string> = ['reportes', 'gestion', 'configuraciones', 'inicio']
        let currentState: string;
        router.events.subscribe(e => {

            if(e instanceof NavigationStart){
                this.routerLoadingBarSource.next(true);//Activa la barra de carga
            }

            if(e instanceof NavigationEnd){
                statments.forEach( (st) =>{
                    if(e.url.toString().includes(st)){
                        currentState = st;
                    }
                });
                this.menuSource.next(currentState);
                this.routerLoadingBarSource.next(false);
            }
        });
    }

    

}