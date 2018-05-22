import { Route } from '@angular/router';
import { ManageDataComponent } from './manage-data.component';
import { AuthGuard } from '../../../biosys-core/services/auth.guard';

export const ManageDataRoutes: Route[] = [
    {
        path: 'data/projects/:projId/datasets/:datasetId',
        component: ManageDataComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard]
    }
];
