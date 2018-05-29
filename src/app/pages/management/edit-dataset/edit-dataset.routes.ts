import { Route } from '@angular/router';
import { EditDatasetComponent } from './edit-dataset.component';
import { SSOAuthGuard } from '../../../shared/services/sso-auth.guard';

export const EditDatasetRoutes: Route[] = [
    {
        path: 'management/projects/edit-project/:projId/create-dataset',
        component: EditDatasetComponent,
        canActivate: [SSOAuthGuard],
        canActivateChild: [SSOAuthGuard]
    },
    {
        path: 'management/projects/edit-project/:projId/edit-dataset/:id',
        component: EditDatasetComponent,
        canActivate: [SSOAuthGuard],
        canActivateChild: [SSOAuthGuard]
    }
];
