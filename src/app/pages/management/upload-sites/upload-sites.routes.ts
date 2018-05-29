import { Route } from '@angular/router';
import { UploadSitesComponent } from './upload-sites.component';
import { SSOAuthGuard } from '../../../shared/services/sso-auth.guard';

export const UploadSitesRoutes: Route[] = [
    {
        path: 'management/projects/edit-project/:projectId/upload-sites',
        component: UploadSitesComponent,
        canActivate: [SSOAuthGuard],
        canActivateChild: [SSOAuthGuard]
    }
];
