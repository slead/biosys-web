import { Route } from '@angular/router';
import { EditProgramComponent } from './edit-program.component';
import { AuthGuard } from '../../../../biosys-core/guards/auth.guard';
import { AdminGuard } from '../../../../biosys-core/guards/admin.guard';

export const EditProgramRoutes: Route[] = [
    {
        path: 'management/programs/create-program',
        component: EditProgramComponent,
        canActivate: [AuthGuard, AdminGuard],
        canActivateChild: [AuthGuard]
    },
    {
        path: 'management/programs/edit-program/:id',
        component: EditProgramComponent,
        canActivate: [AuthGuard, AdminGuard],
        canActivateChild: [AuthGuard]
    }
];
