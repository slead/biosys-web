import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthGuard } from '../../biosys-core/services/auth.guard';
import { AuthService } from '../../biosys-core/services/auth.service';

@Injectable()
export class SSOAuthGuard extends AuthGuard implements CanActivate {
    constructor(protected authService: AuthService, private router: Router) {
        super(authService);
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
