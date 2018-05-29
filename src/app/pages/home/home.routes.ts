import { Route } from '@angular/router';
import { HomeComponent } from './home.component';
import { SSOAuthGuard } from '../../shared/services/sso-auth.guard';

export const HomeRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [SSOAuthGuard]
  }
];
