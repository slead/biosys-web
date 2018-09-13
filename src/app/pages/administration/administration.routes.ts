import { Route } from '@angular/router';

import { ListProgramsRoutes } from './list-programs/list-programs.routes';
import { EditProgramRoutes } from './edit-program/edit-program.routes';
import { ManagementListProjectsRoutes } from './list-projects/list-projects.routes';
import { EditProjectRoutes } from './edit-project/edit-project.routes';
import { EditSiteRoutes } from './edit-site/edit-site.routes';
import { EditDatasetRoutes } from './edit-dataset/edit-dataset.routes';
import { UploadSitesRoutes } from './upload-sites/upload-sites.routes';

export const AdministrationRoutes: Route[] = [
    ...ListProgramsRoutes,
    ...EditProgramRoutes,
    ...ManagementListProjectsRoutes,
    ...EditProjectRoutes,
    ...EditSiteRoutes,
    ...EditDatasetRoutes,
    ...UploadSitesRoutes,
];
