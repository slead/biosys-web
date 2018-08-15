import { Route } from '@angular/router';
import { EditProjectComponent } from './edit-project.component';
import { DataEngineerGuard } from '../../../shared/guards/data-engineer.guard';
import { AuthGuard } from '../../../shared/guards/auth.guard';

export const EditProjectRoutes: Route[] = [
    {
        path: 'management/projects/create-project',
        component: EditProjectComponent,
        canActivate: [AuthGuard, DataEngineerGuard]
    },
    {
        path: 'management/projects/edit-project/:projId',
        component: EditProjectComponent,
        canActivate: [AuthGuard, DataEngineerGuard]
    }
];
