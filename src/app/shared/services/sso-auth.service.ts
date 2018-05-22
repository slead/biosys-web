import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { APIService } from '../../biosys-core/services/api.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../biosys-core/services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class SSOAuthService extends AuthService {
    constructor(private api: APIService, private router: Router) {
        super();
    }

    public getAuthToken(): string {
        return Cookie.get('auth_token');
    }

    public login(username: string, password: string) {
        return this.api.getAuthToken(username, password).pipe(
            map(res => Cookie.set('auth_token', res.token))
        );
    }

    public logout() {
        if (!environment.production) {
            Cookie.deleteAll();
        }
        window.location.href = environment.logoutUrl;
    }

    public isLoggedIn(): boolean {
        if (this.api.receivedUnauthenticatedError) {
            if (!environment.production) {
                Cookie.deleteAll();
            }
            return false;
        }

        return !!Cookie.get(environment.cookieAuthToken);
    }
}
