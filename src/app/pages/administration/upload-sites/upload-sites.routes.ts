import { Route } from '@angular/router';
import { UploadSitesComponent } from './upload-sites.component';
import { DataEngineerGuard } from '../../../shared/guards/data-engineer.guard';
import { AuthGuard } from '../../../shared/guards/auth.guard';

export const UploadSitesRoutes: Route[] = [
    {
        path: 'administration/projects/edit-project/:projectId/upload-sites',
        component: UploadSitesComponent,
        canActivate: [AuthGuard, DataEngineerGuard]
    }
];
