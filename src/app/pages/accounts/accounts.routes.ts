import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AdminOnlyComponent } from './admin-only/admin-only.component';

export const AccountsRoutes: Route[] = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'change-password',
        component: ChangePasswordComponent
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent
    },
    {
        path: 'reset-password/:uid/:token',
        component: ResetPasswordComponent
    },
    {
        path: 'admin-only',
        component: AdminOnlyComponent
    }
];
