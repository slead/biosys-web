import { Route } from '@angular/router';
import { EditDatasetComponent } from './edit-dataset.component';
import { AuthGuard } from '../../../biosys-core/services/auth.guard';

export const EditDatasetRoutes: Route[] = [
    {
        path: 'management/projects/edit-project/:projId/create-dataset',
        component: EditDatasetComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard]
    },
    {
        path: 'management/projects/edit-project/:projId/edit-dataset/:id',
        component: EditDatasetComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard]
    }
];
