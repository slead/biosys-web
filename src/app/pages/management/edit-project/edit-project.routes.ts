import { Route } from '@angular/router';
import { EditProjectComponent } from './edit-project.component';
import { DataEngineerGuard } from '../../../../biosys-core/guards/data-engineer.guard';
import { AuthGuard } from '../../../../biosys-core/guards/auth.guard';

export const EditProjectRoutes: Route[] = [
    {
        path: 'management/projects/create-project',
        component: EditProjectComponent,
        canActivate: [AuthGuard, DataEngineerGuard],
        canActivateChild: [AuthGuard]
    },
    {
        path: 'management/projects/edit-project/:id',
        component: EditProjectComponent,
        canActivate: [AuthGuard, DataEngineerGuard],
        canActivateChild: [AuthGuard]
    }
];
