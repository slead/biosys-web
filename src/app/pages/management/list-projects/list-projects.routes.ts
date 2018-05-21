import { Route } from '@angular/router';
import { ManagementListProjectsComponent } from './list-projects.component';
import { AuthGuard } from '../../../biosys-core/services/auth.guard';
import { EditProjectRoutes } from '../edit-project/edit-project.routes';
import { EditSiteRoutes } from '../edit-site/edit-site.routes';
import { EditDatasetRoutes } from '../edit-dataset/edit-dataset.routes';
import { UploadSitesRoutes } from '../upload-sites/upload-sites.routes';

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
