import { Route } from '@angular/router';
import { ListDatasetsComponent } from './list-datasets.component';
import { AuthGuard } from '../../../shared/guards/auth.guard';
import { TeamMemberGuard } from '../../../shared/guards/team-member.guard';

export const DatasetsRoutes: Route[] = [
    {
        path: 'data-management/projects/:projId/datasets',
        component: ListDatasetsComponent,
        canActivate: [AuthGuard, TeamMemberGuard]
    }
];
