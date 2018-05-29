import { Route } from '@angular/router';
import { EditSiteComponent } from './edit-site.component';
import { SSOAuthGuard } from '../../../shared/services/sso-auth.guard';

export const EditSiteRoutes: Route[] = [
    {
        path: 'management/projects/edit-project/:projId/create-site',
        component: EditSiteComponent,
        canActivate: [SSOAuthGuard],
        canActivateChild: [SSOAuthGuard]
    },
    {
        path: 'management/projects/edit-project/:projId/edit-site/:id',
        component: EditSiteComponent,
        canActivate: [SSOAuthGuard],
        canActivateChild: [SSOAuthGuard]
    }
];
