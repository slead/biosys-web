import { Route } from '@angular/router';
import { EditProjectComponent } from './edit-project.component';
import { SSOAuthGuard } from '../../../shared/services/sso-auth.guard';

export const EditProjectRoutes: Route[] = [
    {
        path: 'management/projects/create-project',
        component: EditProjectComponent,
        canActivate: [SSOAuthGuard],
        canActivateChild: [SSOAuthGuard]
    },
    {
        path: 'management/projects/edit-project/:id',
        component: EditProjectComponent,
        canActivate: [SSOAuthGuard],
        canActivateChild: [SSOAuthGuard]
    }
];
