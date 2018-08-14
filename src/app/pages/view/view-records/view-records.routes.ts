import { Route } from '@angular/router';
import { ViewRecordsComponent } from './view-records.component';
import { AuthGuard } from '../../../../biosys-core/guards/auth.guard';
export const ViewRecordsRoutes: Route[] = [
    {
        path: 'view',
        component: ViewRecordsComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard]
    }
];
