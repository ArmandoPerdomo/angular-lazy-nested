import { Component, OnInit, Inject } from '@angular/core';
import { LoginService } from '../../../core/services/login.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface UsernameData {
  nombreusuario: string;
}

@Component({
  selector: 'app-dialog-session-duplicada',
  templateUrl: './dialog-session-duplicada.component.html',
  styleUrls: ['./dialog-session-duplicada.component.css']
})
export class DialogSessionDuplicadaComponent implements OnInit {

  inLogout: string;
  constructor(
    private loginService: LoginService,
    public dialogRef: MatDialogRef<DialogSessionDuplicadaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UsernameData
  ) { }

  ngOnInit() {
  }

  doLogout(){
    this.inLogout = "1";
    this.loginService.logout(this.data.toString())
      .subscribe(() => {
        this.inLogout = "2";
        localStorage.clear();
      },err => {
        this.inLogout = 'error'
        console.log(err);
      });
  }

}
