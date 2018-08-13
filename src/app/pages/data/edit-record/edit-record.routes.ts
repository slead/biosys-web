import { Route } from '@angular/router';
import { EditRecordComponent } from './edit-record.component';
import { AuthGuard } from '../../../../biosys-core/guards/auth.guard';

export const EditRecordRoutes: Route[] = [
    {
        path: 'data/projects/:projId/datasets/:datasetId/create-record',
        component: EditRecordComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard]
    },
    {
        path: 'data/projects/:projId/datasets/:datasetId/record/:recordId',
        component: EditRecordComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard]
    },
    {
        path: 'data/projects/:projId/datasets/:datasetId/create-child-record',
        component: EditRecordComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard]
    },
    {
        path: 'data/projects/:projId/datasets/:datasetId/child-record/:recordId',
        component: EditRecordComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard]
    }
];
