import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { APIService } from '../../../biosys-core/services/api.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../../biosys-core/services/auth.service';
import { User } from '../../../biosys-core/interfaces/api.interfaces';

@Injectable()
export class SSOAuthService extends AuthService {
    constructor(protected apiService: APIService) {
        super(apiService);
    }

    public getAuthToken(): string {
        return Cookie.get('auth_token');
    }

    public login(username: string, password: string): Observable<User> {
        return this.apiService.getAuthToken(username, password).pipe(
            map(res => Cookie.set('auth_token', res['token'])),
            mergeMap(() => this.getCurrentUser())
        );
    }

    public logout() {
        this.user = null;

        // cookie deleted by SSO

        window.location.href = environment['logoutUrl'];
    }

    public isLoggedIn(): boolean {
        if (this.apiService.receivedUnauthenticatedError) {
            return false;
        }

        return !!Cookie.get(environment['cookieAuthToken']);
    }
}
