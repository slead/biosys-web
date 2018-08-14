import { Route } from '@angular/router';
import { ManagementListProjectsComponent } from './list-projects.component';
import { DataEngineerGuard } from '../../../../biosys-core/guards/data-engineer.guard';
import { AuthGuard } from '../../../../biosys-core/guards/auth.guard';

export const ManagementListProjectsRoutes: Route[] = [
    {
        path: 'management/projects',
        component: ManagementListProjectsComponent,
        canActivate: [AuthGuard, DataEngineerGuard],
        canActivateChild: [AuthGuard]
    }
];
