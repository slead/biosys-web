import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, mergeMap, tap } from 'rxjs/operators';
import { APIService } from '../../../biosys-core/services/api.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../../biosys-core/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../biosys-core/interfaces/api.interfaces';
import { of } from 'rxjs/observable/of';

@Injectable()
export class SSOAuthService extends AuthService {
    private user: User;

    constructor(private api: APIService, private router: Router) {
        super();
    }

    public getAuthToken(): string {
        return Cookie.get('auth_token');
    }

    public getCurrentUser(): Observable<User> {
        if (!this.user) {
            return this.api.whoAmI().pipe(
                tap((user: User) => this.user = user)
            );
        } else {
            return of(this.user);
        }
    }

    public login(username: string, password: string): Observable<User> {
        return this.api.getAuthToken(username, password).pipe(
            map(res => Cookie.set('auth_token', res.token)),
            mergeMap(() => this.getCurrentUser())
        );
    }

    public logout() {
        this.user = null;
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
