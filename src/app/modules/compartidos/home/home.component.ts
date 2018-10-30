import { Component, ChangeDetectorRef, OnInit, OnDestroy, HostListener } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { HomeService } from '../../../core/services/home.services';
import { fadeAnimation } from '../../../core/constants/fade-animation.constant';
import { UserIdleService } from 'angular-user-idle';
import { MatDialog } from '@angular/material';
import { DialogSessionNotificationComponent } from '../dialog-notification/dialog-session-notification.component';
import { UserTokenService } from '../../../core/services/user-token.service';
import { StompService, StompState } from '@stomp/ng2-stompjs';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators'
import { DialogSessionReconectandoComponent } from '../dialog-session-reconectando/dialog-session-reconectando.component';
import { Router, NavigationStart } from '@angular/router';
import { User } from '../../../abstract/class/user';
import { AccessRoutesService } from '../../../core/services/access-routes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [fadeAnimation]
})
export class HomeComponent implements OnInit, OnDestroy{

  /*
  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: any) {
    event.returnValue = true;
    this.unsuscribe();
  }*/

  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  sidenavIsToggled: Boolean;
  routerLoadingBarState: Boolean;
  suscribedPing: Subscription;
  suscribedTimeout: Subscription;
  suscribedSocket: Subscription;
  suscribedState: Subscription;

  constructor(
    private changeDetectorRef: ChangeDetectorRef, 
    private media: MediaMatcher, 
    private hs: HomeService,
    private userIdle: UserIdleService,
    public dialog: MatDialog,
    private userToken: UserTokenService,
    private stompService: StompService,
    private router: Router,
    private ar: AccessRoutesService
  ){
    this.mobileQuery = this.media.matchMedia('(max-width: 800px)');//Query para un breakpoint
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();//Mobile Query devolverá cuando sea ejecutado el detectChanges()
    this.mobileQuery.addListener(this._mobileQueryListener);//Listener del rezise event

    if(this.userToken.isLogged()){
      this.initSocketSession();
    }

    console.warn('has reportes access', this.ar.hasReportesAccess())
    console.warn('has gestion access', this.ar.hasGestionAccess())
    console.table(this.ar.getAllAccess());
    console.table(this.ar.getAllAccessOnlyDetail());
    console.table(this.ar.getAllAccessPrent());
  }

  ngOnInit(): void {
    /**
     * Este es un evento al cual nos podemos suscribir
     * Recibirá como parámetro true o false
     * Dependerá de donde se este cambiando su valor este mismo se actualizará
     * de manera automática
     */
    this.hs.sideBarToggled.subscribe(toggle => {
      this.sidenavIsToggled = toggle;
    });

    /**
     * Podemos escuchar cuando cambian el valor de la barra de carga
     * mediante este subject
     */
    this.hs.routerLoadingBarShow.subscribe(isLoading => {
      this.routerLoadingBarState = isLoading;
    });

    // Para empezar el cronometro de la sesión
    this.userIdle.startWatching();
    
    //Si se desea utilizar el trigger despues que termine el tiempo de sesión
    this.userIdle.onTimerStart().subscribe();

    // Cuando el tiempo se acaba destruimos todo
    this.suscribedTimeout = this.userIdle.onTimeout().subscribe(() => {
      this.sessionTimeout();
    });

    /**
     * Hacemos ping cada x cantidad de segundos para corroborar
     * el estatus de la session de cara el servidor
     * además es comprobado la integridad del localstorage
     * comprobando con la @function isLogged() que devuelve un valor
     * boolean, si @returns {false} entonces localstorage sufrió eliminación
     * lógica, además esto comprueba si el token esta caducado o no.
     */
    this.suscribedPing = this.userIdle.ping$.subscribe(() => {
      
      const userLogged : User = this.userToken.getUserLogged();
      if(userLogged && this.stompService.connected()){
        this.stompService.publish('/app/bitacora-status', userLogged.nombreUsuario);
      }
      
      const isLogged = this.userToken.isLogged();
      if(!isLogged){
        this.sessionTimeout();
      }
    });

    this.router.events.subscribe((e) => {
      if(e instanceof NavigationStart && !e.url.includes('/app')){
        this.unsuscribe();
      }
    });
  }

  //Importante para obtener el estatus de el router-outlet y así hacer animaciones
  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

  /**
   * Fucion que hace trigger del servicio para cerrar el sidebar
   * Es activado mendiante el callback del (closed)="" sidebar
   */
  forceClosed(): void{
    this.hs.toggleSidebar(false);
  }

  /**
   * Inicia la sesión vía socket hacia el servidor
   * 
   * Primero comprueba si existe el almacenamiento del usuario en localstorage
   * para obtener información y así activar a el suscriptor individual para que
   * escuche si la sesión ha caducado.
   * 
   * Si la sesión ha caducado es llamado a @function sessionTimeout()
   * Si hubo un error al obtener la información del localstorage es llamado @function sessionTimeout()
   */
  initSocketSession(): void{
    const userLogged : User = this.userToken.getUserLogged();
    if(userLogged){//Comprobamos si el usuario esta logeado
      this.stompService.initAndConnect();//Inicializamos el Socket

      //Nos suscribimos a el queue url
      let stomp_user_sub = this.stompService.subscribe(`/user/${userLogged.nombreUsuario}/close-session`,{ "username": userLogged.nombreUsuario });

      //Cuando el queue envía una respuesta es por que se cerró la sesión
      this.suscribedSocket = stomp_user_sub.subscribe(() => {
        this.sessionTimeout();
      });

      let dialog;//Dialog de "Reconectando"
      //No suscribimos al state del socket "CLOSED" & "CONNECTED"
      this.suscribedState = this.stompService.state.pipe(map((state: number) => StompState[state]))
        .subscribe((status: string) => {
          if(!dialog && status.match("CLOSED")){
            dialog = this.dialog.open(DialogSessionReconectandoComponent,{
              disableClose: true
            });
          }
          if(dialog && status.match("CONNECTED")){
            dialog.close();
            dialog = null;
          }
        });
    }else{
      this.sessionTimeout();
      throw new Error('Hubo un error interno, el usuario no se encuentra definido');
    }
  }

  /**
   * Es importante esta función ya que abre un dialog de material
   * que no es cerrable hasta que se desbloquee el botón para iniciar sesión.
   * Cuando este dialog se abre el mismo activa una función que automáticamente se
   * suscribe para cerrar la sesión actual del usuario
   * 
   * Mientras que esa suscripción sigue, se llama a @function unsubscribe() el cual
   * anula todas las suscripciones de sesión y sockets que esten abiertas ya que esto
   * puede producir problemas y acumulación de eventos
   * 
   * @requires unsubscribe() call
   */
  sessionTimeout(): void{
    this.dialog.open(
      DialogSessionNotificationComponent,
      {disableClose: true}
    );
    this.unsuscribe();
  }

  /**
   * elimina todas las suscripciones
   * 
   * Es obligatorio para que ya que el usuario no se
   * encuentre dentro del sistema todas las suscripciones sean
   * eliminadas
   */
  unsuscribe():void{
    this.suscribedTimeout.unsubscribe();
    this.suscribedPing.unsubscribe();
    this.suscribedSocket.unsubscribe();
    this.suscribedState.unsubscribe();
    this.userIdle.stopWatching();
    this.stompService.disconnect();
    setTimeout(()=> this.userToken.clearStorage(), 1);//Importante que se ejecute luego que finalice el stack
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}