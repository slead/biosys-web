import { Route } from '@angular/router';
import { ViewRecordsComponent } from './view-records.component';
import { AuthGuard } from '../../../shared/index';

export const ViewRecordsRoutes: Route[] = [
    {
        path: 'view',
        component: ViewRecordsComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard]
    }
];
