import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    
    constructor(
        private http: HttpClient,
        public jwtHelper: JwtHelperService,
    ) {}

    public get loggedIn(): boolean {
        if ( localStorage.getItem('auth_token') )
            if ( this.jwtHelper.decodeToken(localStorage.getItem('auth_token')).exp <= new Date().getTime()/1000 )
                localStorage.removeItem('auth_token');
        return localStorage.getItem('auth_token') !==  null
    }

    public getUser(){
        return this.jwtHelper.decodeToken(localStorage.getItem('auth_token')).user_id
    }

    login(email: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/login`, { email, password })
        .pipe(tap(res => {
            localStorage.setItem('auth_token', res.auth_token);
        }));
    }

    login_with_social(token, provider){
        return this.http.post<any>(`${environment.apiUrl}/login/${provider}`, { id_token: token })
        .pipe(tap(res => {
            localStorage.setItem('auth_token', res.auth_token);
        }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('auth_token');
    }


}