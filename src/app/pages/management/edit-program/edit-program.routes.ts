import { Route } from '@angular/router';
import { EditProgramComponent } from './edit-program.component';
import { SSOAuthGuard } from '../../../shared/services/sso-auth.guard';

export const EditProgramRoutes: Route[] = [
    {
        path: 'management/programs/create-program',
        component: EditProgramComponent,
        canActivate: [SSOAuthGuard],
        canActivateChild: [SSOAuthGuard]
    },
    {
        path: 'management/programs/edit-program/:id',
        component: EditProgramComponent,
        canActivate: [SSOAuthGuard],
        canActivateChild: [SSOAuthGuard]
    }
];
