import { Route } from '@angular/router';
import { ViewRecordsComponent } from './view-records.component';
import { SSOAuthGuard } from '../../../shared/services/sso-auth.guard';
export const ViewRecordsRoutes: Route[] = [
    {
        path: 'view',
        component: ViewRecordsComponent,
        canActivate: [SSOAuthGuard],
        canActivateChild: [SSOAuthGuard]
    }
];
