import { Injectable } from '@angular/core';
import { APIService } from './index';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {
    static getAuthToken() {
        return Cookie.get('auth_token');
    }

    constructor(private api: APIService) {
    }

    login(username: string, password: string) {
        return this.api.getAuthToken(username, password)
            .map(token => {
                // set the token
                Cookie.set('auth_token', token);
            });
    }

    logout() {
        if (!environment.production) {
            Cookie.deleteAll();
        }
        window.location.href = environment.logoutUrl;
    }

    isLoggedIn() {
        // if (this.api.receivedUnauthenticatedError) {
        //     Cookie.deleteAll();
        //     return false;
        // }

        return Cookie.get(environment.cookieAuthToken);
    }
}
