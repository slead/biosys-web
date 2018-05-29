import { Route } from '@angular/router';
import { DataListProjectsComponent } from './list-projects.component';
import { SSOAuthGuard } from '../../../shared/services/sso-auth.guard';
import { DatasetsRoutes } from '../list-datasets/list-datasets.routes';
import { ManageDataRoutes } from '../manage-data/manage-data.routes';
import { EditRecordRoutes } from '../edit-record/edit-record.routes';

export const DataListProjectsRoutes: Route[] = [
    {
        path: 'data/projects',
        component: DataListProjectsComponent,
        canActivate: [SSOAuthGuard],
        canActivateChild: [SSOAuthGuard]
    },
    ...DatasetsRoutes,
    ...ManageDataRoutes,
    ...EditRecordRoutes
];
