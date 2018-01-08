import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { APIService } from './api/api.service';
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
        return this.api.getAuthToken(username, password).pipe(
            map(res => Cookie.set('auth_token', res.token))
        );
    }

    logout() {
        if (!environment.production) {
            Cookie.deleteAll();
        }
        window.location.href = environment.logoutUrl;
    }

    isLoggedIn() {
        if (this.api.receivedUnauthenticatedError) {
            if (!environment.production) {
                Cookie.deleteAll();
            }
            return false;
        }

        return Cookie.get(environment.cookieAuthToken);
    }
}
