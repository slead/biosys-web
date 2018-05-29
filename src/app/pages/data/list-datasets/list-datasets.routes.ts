import { Route } from '@angular/router';
import { ListDatasetsComponent } from './list-datasets.component';
import { SSOAuthGuard } from '../../../shared/services/sso-auth.guard';

export const DatasetsRoutes: Route[] = [
    {
        path: 'data/projects/:projId/datasets',
        component: ListDatasetsComponent,
        canActivate: [SSOAuthGuard],
        canActivateChild: [SSOAuthGuard]
    }
];
