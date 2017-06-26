import { Injectable } from '@angular/core';
import { APIService } from './index';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {
    private api: APIService;
    private hasAuthToken = false;

    static getAuthToken() {
        return localStorage.getItem('auth_token');
    }

    constructor(api: APIService) {
        this.hasAuthToken = !!localStorage.getItem('auth_token');
        this.api = api;
    }

    login(username: string, password: string) {
        return this.api.getAuthToken(username, password)
            .map(token => {
                // set the token
                localStorage.setItem('auth_token', token);
                this.hasAuthToken = true;
            });
    }

    logout() {
        localStorage.removeItem('auth_token');
        Cookie.deleteAll();
        this.hasAuthToken = false;

        window.location.href = environment.logoutUrl;
    }

    isLoggedIn() {
        return true;
    }

}
