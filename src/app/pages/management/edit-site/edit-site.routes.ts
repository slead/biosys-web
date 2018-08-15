import { Route } from '@angular/router';
import { EditSiteComponent } from './edit-site.component';
import { DataEngineerGuard } from '../../../shared/guards/data-engineer.guard';
import { AuthGuard } from '../../../shared/guards/auth.guard';

export const EditSiteRoutes: Route[] = [
    {
        path: 'management/projects/edit-project/:projId/create-site',
        component: EditSiteComponent,
        canActivate: [AuthGuard, DataEngineerGuard]
    },
    {
        path: 'management/projects/edit-project/:projId/edit-site/:id',
        component: EditSiteComponent,
        canActivate: [AuthGuard, DataEngineerGuard]
    }
];
