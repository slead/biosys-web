import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/index';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthGuard implements CanActivate {
    private auth: AuthService;
    private router: Router;

    constructor(router: Router, auth: AuthService) {
        this.router = router;
        this.auth = auth;
    }

    canActivate() {
        if (!this.auth.isLoggedIn()) {
            if (environment.production) {
                window.location.reload(true);
            } else {
                this.router.navigate(['/login']);
            }
            return false;
        }

        return true;
    }
}
