import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../../abstract/class/user';

@Injectable()
export class UserTokenService {

    jwtHelper: JwtHelperService;

    constructor(){ 
        this.jwtHelper = new JwtHelperService();
    }

    public tokenHasExpired(): boolean{
        return this.jwtHelper.isTokenExpired(localStorage.getItem('access_token'));
    }

    public getExpirationDate(): Date{
        return this.jwtHelper.getTokenExpirationDate(localStorage.getItem('access_token'));
    }

    public getTokenDecoded(){
        return this.jwtHelper.decodeToken(localStorage.getItem('access_token'));
    }

    public isLogged(): boolean{
        return (
            localStorage.getItem('access_token') &&
            localStorage.getItem('access_routes') &&
            localStorage.getItem('user_data') &&
            !this.tokenHasExpired()
        );
    }

    public getUserLogged(): User {
        return JSON.parse(localStorage.getItem('user_data'));
    }

    public clearStorage(): void{
        localStorage.clear();
    }
}