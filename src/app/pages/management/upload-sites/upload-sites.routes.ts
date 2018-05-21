import { Route } from '@angular/router';
import { UploadSitesComponent } from './upload-sites.component';
import { AuthGuard } from '../../../biosys-core/services/auth.guard';

export const UploadSitesRoutes: Route[] = [
    {
        path: 'management/projects/edit-project/:projectId/upload-sites',
        component: UploadSitesComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard]
    }
];
