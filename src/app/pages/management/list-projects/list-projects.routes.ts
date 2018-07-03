import { Route } from '@angular/router';
import { SSOAuthGuard } from '../../../shared/services/sso-auth.guard';
import { ManagementListProjectsComponent } from './list-projects.component';

export const ManagementListProjectsRoutes: Route[] = [
    {
        path: 'management/projects',
        component: ManagementListProjectsComponent,
        canActivate: [SSOAuthGuard],
        canActivateChild: [SSOAuthGuard]
    }
];
