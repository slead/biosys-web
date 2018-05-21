import { Route } from '@angular/router';
import { DataListProjectsComponent } from './list-projects.component';
import { AuthGuard } from '../../../biosys-core/services/auth.guard';
import { DatasetsRoutes } from '../list-datasets/list-datasets.routes';
import { ManageDataRoutes } from '../manage-data/manage-data.routes';
import { EditRecordRoutes } from '../edit-record/edit-record.routes';

export const DataListProjectsRoutes: Route[] = [
    {
        path: 'data/projects',
        component: DataListProjectsComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard]
    },
    ...DatasetsRoutes,
    ...ManageDataRoutes,
    ...EditRecordRoutes
];
