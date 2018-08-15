import { Route } from '@angular/router';
import { EditDatasetComponent } from './edit-dataset.component';
import { DataEngineerGuard } from '../../../shared/guards/data-engineer.guard';
import { AuthGuard } from '../../../shared/guards/auth.guard';

export const EditDatasetRoutes: Route[] = [
    {
        path: 'management/projects/edit-project/:projId/create-dataset',
        component: EditDatasetComponent,
        canActivate: [AuthGuard, DataEngineerGuard]
    },
    {
        path: 'management/projects/edit-project/:projId/edit-dataset/:id',
        component: EditDatasetComponent,
        canActivate: [AuthGuard, DataEngineerGuard]
    }
];
