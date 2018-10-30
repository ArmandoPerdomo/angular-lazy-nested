import { NgModule, ErrorHandler } from '@angular/core';
import { AppComponent } from './app.component';
import { NgbModule, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { Angular2FontawesomeModule } from 'angular2-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { LoginService } from './core/services/login.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './modules/compartidos/home/home.component';
import { FormControlService } from './core/services/form-control.service';
import { MetodosGlobalesService } from './core/services/metodosglobales.service';
import { NgSelectModule, NG_SELECT_DEFAULT_CONFIG } from '@ng-select/ng-select';
import { MatCheckboxModule } from '@angular/material';
import { MaterialDesignModule } from './core/UI/material-design/material-design.module';
import { ListaEmpresasComponent } from './modules/compartidos/dialogs/lista-empresas.component';
import { Globals } from './core/services/globals.service';
import { LoadingModule } from 'ngx-loading';
import { FontAwesomeConstrutodoModule } from './core/UI/font-awesome/font-awesome.module';
import { SidenavComponent } from './modules/compartidos/sidenav/sidenav.component';
import { ToolbarComponent } from './modules/compartidos/toolbar/toolbar.component';
import { HomeService } from './core/services/home.services';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InicioDashboardComponent } from './modules/inicio/inicio-dashboard/inicio-dashboard.component';
import * as bootstrap from 'bootstrap';
import { LoginComponent } from './modules/public/login/login.component';
import { ErrorsHandler } from './core/services/error-handle.service';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { I18n } from './core/services/i18n/i18n.service';
import { CustomDatepickerI18n } from './core/services/i18n/custom-datepicker-i18n.service';
import { UserTokenService } from './core/services/user-token.service';
import { UserIdleModule } from 'angular-user-idle';
import { UIComponentsService } from './core/services/ui-components.service';
import { DialogSessionNotificationComponent } from './modules/compartidos/dialog-notification/dialog-session-notification.component';
import { JwtModule } from '@auth0/angular-jwt';
import { tokenGetter } from './abstract/functions/tokengetter.function';
import { environment } from '../environments/environment';
import { IDLE_CONFIG } from './core/constants/idle.constant';
import { DialogSessionDuplicadaComponent } from './modules/compartidos/dialog-session-duplicada/dialog-session-duplicada.component';
import { StompService, StompConfig } from '@stomp/ng2-stompjs';
import { STOMP_CONFIG } from './core/constants/stopm.config.constant';
import { DialogSessionReconectandoComponent } from './modules/compartidos/dialog-session-reconectando/dialog-session-reconectando.component';
import { CTAuthGuard } from './core/services/auth-guard.service';
import { AccessRoutesService } from './core/services/access-routes.service';
import { NavItemComponent } from './modules/compartidos/nav-item/nav-item.component';
import { CTPermisionsGuard } from './core/services/permissions-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListaEmpresasComponent,
    SidenavComponent,
    ToolbarComponent,
    InicioDashboardComponent,
    LoginComponent,
    DialogSessionNotificationComponent,
    DialogSessionDuplicadaComponent,
    DialogSessionReconectandoComponent,
    NavItemComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    NgSelectModule,
    Angular2FontawesomeModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialDesignModule,
    MatCheckboxModule,
    LoadingModule,
    FontAwesomeConstrutodoModule,
    HttpModule,
    NgbModule.forRoot(),
    UserIdleModule.forRoot(IDLE_CONFIG),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: environment.apiWhitelistTokenAttach
      }
    }),
  ],
  entryComponents: [
    ListaEmpresasComponent,
    DialogSessionNotificationComponent,
    DialogSessionDuplicadaComponent,
    DialogSessionReconectandoComponent
  ],
  providers: [
    LoginService,
    FormControlService,
    MetodosGlobalesService,
    Globals,
    HomeService,
    UserTokenService,
    CTAuthGuard,
    CTPermisionsGuard,
    UIComponentsService,
    AccessRoutesService,
    {
      provide: NG_SELECT_DEFAULT_CONFIG,
      useValue: {
        notFoundText: 'No se encuentran mas items'
      }
    },
    {
      provide: ErrorHandler,
      useClass: ErrorsHandler,
    },
    I18n, 
    {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n},
    StompService,
    {
      provide: StompConfig,
      useValue: STOMP_CONFIG
    }
  ],
  bootstrap: [
    AppComponent
  ],
  exports: [
    MaterialDesignModule, 
    MatCheckboxModule
  ]
})
export class AppModule {}
