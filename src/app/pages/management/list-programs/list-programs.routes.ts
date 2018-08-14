import { Route } from '@angular/router';
import { ListProgramsComponent } from './list-programs.component';
import { AuthGuard } from '../../../../biosys-core/guards/auth.guard';
import { AdminGuard } from '../../../../biosys-core/guards/admin.guard';

export const ListProgramsRoutes: Route[] = [
    {
        path: 'management/programs',
        component: ListProgramsComponent,
        canActivate: [AuthGuard, AdminGuard],
        canActivateChild: [AuthGuard]
    }
];
