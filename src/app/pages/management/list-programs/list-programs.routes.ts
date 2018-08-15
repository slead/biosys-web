import { Route } from '@angular/router';
import { ListProgramsComponent } from './list-programs.component';
import { AuthGuard } from '../../../shared/guards/auth.guard';
import { AdminGuard } from '../../../shared/guards/admin.guard';

export const ListProgramsRoutes: Route[] = [
    {
        path: 'management/programs',
        component: ListProgramsComponent,
        canActivate: [AuthGuard, AdminGuard]
    }
];
