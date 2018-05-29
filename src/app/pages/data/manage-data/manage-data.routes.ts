import { Route } from '@angular/router';
import { ManageDataComponent } from './manage-data.component';
import { SSOAuthGuard } from '../../../shared/services/sso-auth.guard';

export const ManageDataRoutes: Route[] = [
    {
        path: 'data/projects/:projId/datasets/:datasetId',
        component: ManageDataComponent,
        canActivate: [SSOAuthGuard],
        canActivateChild: [SSOAuthGuard]
    }
];
