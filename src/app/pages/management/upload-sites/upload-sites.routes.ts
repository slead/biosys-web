import { Route } from '@angular/router';
import { UploadSitesComponent } from './upload-sites.component';
import { DataEngineerGuard } from '../../../../biosys-core/guards/data-engineer.guard';
import { AuthGuard } from '../../../../biosys-core/guards/auth.guard';

export const UploadSitesRoutes: Route[] = [
    {
        path: 'management/projects/edit-project/:projectId/upload-sites',
        component: UploadSitesComponent,
        canActivate: [AuthGuard, DataEngineerGuard],
        canActivateChild: [AuthGuard]
    }
];
