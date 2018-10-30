import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../../core/services/login.service';
import { UserAuth } from '../../../abstract/class/user-auth';
import { UIComponentsService } from '../../../core/services/ui-components.service';
import { Router } from '@angular/router';
import { UserTokenService } from '../../../core/services/user-token.service';
import { MatDialog } from '@angular/material';
import { DialogSessionDuplicadaComponent } from '../../compartidos/dialog-session-duplicada/dialog-session-duplicada.component';
import { StompService } from '@stomp/ng2-stompjs';
import { User } from '../../../abstract/class/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  inSubmit: Boolean = false;

  constructor(
    private fb: FormBuilder, 
    private loginService: LoginService,
    private ui: UIComponentsService,
    private router: Router,
    private userTokenService: UserTokenService,
    public dialog: MatDialog
  ) { 

    this.loginForm = this.fb.group({
      username: ['', [
        Validators.pattern(/^[-\w\.\$@\*\!]{1,30}$/), 
        Validators.required,
        Validators.maxLength(30)
      ]],
      password: ['', [
        Validators.required, 
        Validators.maxLength(30)
      ]]
    })
  }

  ngOnInit() {

    if(this.userTokenService.isLogged()){
      const userLogged : User = this.userTokenService.getUserLogged();
      this.doLogout(userLogged.nombreUsuario);
    }
  }

  login(){
    this.inSubmit = true;
    const val = this.loginForm.value;

    this.loginService.login(new UserAuth(val.username, val.password))
      .subscribe( resp => {
        this.inSubmit = false;
        const data = resp.body;
        localStorage.setItem('access_token', data.token);
        localStorage.setItem('access_routes', JSON.stringify(data.permisologias));
        localStorage.setItem('user_data', JSON.stringify(data.usuario));
        this.router.navigate(['/app/inicio']);
      }, err => {
        this.inSubmit = false;
        const data = err.error;
        if(err.status === 401){
          if(data.code === "C103"){
            this.ui.showSnackNotification('Usuario y contraseña incorrectos');
          }else{
            this.ui.showSnackNotification('El usuario no existe o se encuentra incativo');
          }
        }else if(err.status === 409){
          if(data.code === "C101"){
            this.dialog.open(DialogSessionDuplicadaComponent,{
              disableClose: true,
              data: val.username
            })
          }else{
            this.ui.showSnackNotification(
              `El usuario no posee una empresa por defecto, por favor comuniquese con su administrador | Código ${data.code}`,
              'OK',
              3000
            );
          }
        }else{
          this.ui.showSnackNotification( `Hubo un error al procesar la solicitud, intentelo mas tarde!`);
        }
      });
  }

  doLogout(username){
    this.loginService.logout(username).subscribe(() => this.userTokenService.clearStorage());
  }

}
