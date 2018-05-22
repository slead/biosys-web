import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthGuard } from '../../biosys-core/services/auth.guard';

@Injectable()
export class SSOAuthGuard extends AuthGuard implements CanActivate {
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
