import { Route } from '@angular/router';
import { SSOAuthGuard } from '../../../shared/services/sso-auth.guard';
import { EditProjectRoutes } from '../edit-project/edit-project.routes';
import { EditSiteRoutes } from '../edit-site/edit-site.routes';
import { EditDatasetRoutes } from '../edit-dataset/edit-dataset.routes';
import { UploadSitesRoutes } from '../upload-sites/upload-sites.routes';
import { ListProgramsComponent } from './list-programs.component';

export const ManagementListProgramRoutes: Route[] = [
    {
        path: 'management/programs',
        component: ListProgramsComponent,
        canActivate: [SSOAuthGuard],
        canActivateChild: [SSOAuthGuard]
    },
    ...EditProjectRoutes,
    ...EditSiteRoutes,
    ...EditDatasetRoutes,
    ...UploadSitesRoutes,
];
