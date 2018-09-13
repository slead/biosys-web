import { Route } from '@angular/router';
import { EditRecordComponent } from './edit-record.component';
import { AuthGuard } from '../../../shared/guards/auth.guard';
import { TeamMemberGuard } from '../../../shared/guards/team-member.guard';

export const EditRecordRoutes: Route[] = [
    {
        path: 'data-management/projects/:projId/datasets/:datasetId/create-record',
        component: EditRecordComponent,
        canActivate: [AuthGuard, TeamMemberGuard]
    },
    {
        path: 'data-management/projects/:projId/datasets/:datasetId/record/:recordId',
        component: EditRecordComponent,
        canActivate: [AuthGuard, TeamMemberGuard]
    },
    {
        path: 'data-management/projects/:projId/datasets/:datasetId/create-child-record',
        component: EditRecordComponent,
        canActivate: [AuthGuard, TeamMemberGuard]
    },
    {
        path: 'data-management/projects/:projId/datasets/:datasetId/child-record/:recordId',
        component: EditRecordComponent,
        canActivate: [AuthGuard, TeamMemberGuard]
    }
];
