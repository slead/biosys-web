import { Route } from '@angular/router';
import { ManagementListProjectsComponent } from './list-projects.component';
import { DataEngineerGuard } from '../../../shared/guards/data-engineer.guard';
import { AuthGuard } from '../../../shared/guards/auth.guard';

export const ManagementListProjectsRoutes: Route[] = [
    {
        path: 'management/projects',
        component: ManagementListProjectsComponent,
        canActivate: [AuthGuard, DataEngineerGuard]
    }
];
