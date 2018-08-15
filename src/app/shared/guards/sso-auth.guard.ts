import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../../biosys-core/services/auth.service';

import { environment } from '../../../environments/environment';
import { AuthGuard } from './auth.guard';

@Injectable()
export class SSOAuthGuard extends AuthGuard implements CanActivate {
    constructor(protected authService: AuthService, protected router: Router) {
        super(authService, router);
    }

    canActivate() {
        if (!this.authService.isLoggedIn()) {
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
