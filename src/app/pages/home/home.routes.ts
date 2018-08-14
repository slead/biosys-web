import { Route } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthGuard } from '../../../biosys-core/guards/auth.guard';

export const HomeRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  }
];
