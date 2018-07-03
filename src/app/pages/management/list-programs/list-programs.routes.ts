import { Route } from '@angular/router';
import { SSOAuthGuard } from '../../../shared/services/sso-auth.guard';
import { ListProgramsComponent } from './list-programs.component';

export const ListProgramsRoutes: Route[] = [
    {
        path: 'management/programs',
        component: ListProgramsComponent,
        canActivate: [SSOAuthGuard],
        canActivateChild: [SSOAuthGuard]
    }
];
