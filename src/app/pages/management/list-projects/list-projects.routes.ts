import { Route } from '@angular/router';
import { ManagementListProjectsComponent } from './list-projects.component';
import { AuthGuard } from '../../../shared/index';
import { EditProjectRoutes } from '../edit-project/index';
import { EditSiteRoutes } from '../edit-site/index';
import { EditDatasetRoutes } from '../edit-dataset/index';
import { UploadSitesRoutes } from '../upload-sites/index';

export const ManagementListProjectsRoutes: Route[] = [
    {
        path: 'management/projects',
        component: ManagementListProjectsComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard]
    },
    ...EditProjectRoutes,
    ...EditSiteRoutes,
    ...EditDatasetRoutes,
    ...UploadSitesRoutes,
];
