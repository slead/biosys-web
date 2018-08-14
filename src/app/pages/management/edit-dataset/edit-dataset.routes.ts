import { Route } from '@angular/router';
import { EditDatasetComponent } from './edit-dataset.component';
import { DataEngineerGuard } from '../../../../biosys-core/guards/data-engineer.guard';
import { AuthGuard } from '../../../../biosys-core/guards/auth.guard';

export const EditDatasetRoutes: Route[] = [
    {
        path: 'management/projects/edit-project/:projId/create-dataset',
        component: EditDatasetComponent,
        canActivate: [AuthGuard, DataEngineerGuard],
        canActivateChild: [AuthGuard]
    },
    {
        path: 'management/projects/edit-project/:projId/edit-dataset/:id',
        component: EditDatasetComponent,
        canActivate: [AuthGuard, DataEngineerGuard],
        canActivateChild: [AuthGuard]
    }
];
