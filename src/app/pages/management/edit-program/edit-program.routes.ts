import { Route } from '@angular/router';
import { EditProgramComponent } from './edit-program.component';
import { AuthGuard } from '../../../shared/guards/auth.guard';
import { AdminGuard } from '../../../shared/guards/admin.guard';

export const EditProgramRoutes: Route[] = [
    {
        path: 'management/programs/create-program',
        component: EditProgramComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'management/programs/edit-program/:id',
        component: EditProgramComponent,
        canActivate: [AuthGuard, AdminGuard]
    }
];
