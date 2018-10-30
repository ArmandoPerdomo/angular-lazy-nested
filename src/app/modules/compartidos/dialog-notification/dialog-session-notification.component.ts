import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoginService } from '../../../core/services/login.service';
import { User } from '../../../abstract/class/user';
import { UserTokenService } from '../../../core/services/user-token.service';

export interface UserData {
  nombreUsuario: string;
}

@Component({
  selector: 'app-dialog-session-notification',
  templateUrl: './dialog-session-notification.component.html',
  styleUrls: ['./dialog-session-notification.component.css']
})
export class DialogSessionNotificationComponent implements OnInit {

  inLogout: string;
  constructor(
    public dialogRef: MatDialogRef<DialogSessionNotificationComponent>,
    private loginService: LoginService,
    private userToken: UserTokenService,
    @Inject(MAT_DIALOG_DATA) public data: UserData
  ) { }

  ngOnInit() {
    const userLogged:User  = this.userToken.getUserLogged();
    this.inLogout = "1";
    if(userLogged){
      this.loginService.logout(userLogged.nombreUsuario).subscribe(() => {
        this.inLogout = "2";
      }, (err) => {
        console.log('error al cerrar sesión', err);
        this.inLogout = "error";
      });
    }else{
      this.inLogout = "error";
    }
  }

}
