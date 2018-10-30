import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserTokenService } from './user-token.service';

@Injectable()
export class CTAuthGuard implements CanActivate {
    constructor(private userToken: UserTokenService, private router: Router) { }
    canActivate() {
        if(!this.userToken.isLogged()){
            this.router.navigate(['/login']);
        }
        return this.userToken.isLogged();
    }
}