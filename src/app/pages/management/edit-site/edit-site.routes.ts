import { Route } from '@angular/router';
import { EditSiteComponent } from './edit-site.component';
import { DataEngineerGuard } from '../../../../biosys-core/guards/data-engineer.guard';
import { AuthGuard } from '../../../../biosys-core/guards/auth.guard';

export const EditSiteRoutes: Route[] = [
    {
        path: 'management/projects/edit-project/:projId/create-site',
        component: EditSiteComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard]
    },
    {
        path: 'management/projects/edit-project/:projId/edit-site/:id',
        component: EditSiteComponent,
        canActivate: [AuthGuard, DataEngineerGuard],
        canActivateChild: [AuthGuard]
    }
];
