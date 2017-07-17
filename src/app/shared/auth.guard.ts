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
        // disabled for now to stop SSO problem of getting kicked out prematurely
        // if (!this.auth.isLoggedIn()) {
        //     if (environment.production) {
        //         window.location.href = environment.logoutUrl;
        //     } else {
        //         this.router.navigate(['/login']);
        //     }
        //     return false;
        // }
        return true;
    }
}
