import { Routes } from '@angular/router';
import { LoginRoutes } from './pages/login/login.routes';
import { HomeRoutes } from './pages/home/home.routes';
import { ManagementListProjectsRoutes } from './pages/management/list-projects/list-projects.routes';
import { DataListProjectsRoutes } from './pages/data/list-projects/list-projects.routes';
import { ViewRecordsRoutes } from './pages/view/view-records/view-records.routes';

export const routes: Routes = [
    ...LoginRoutes,
    ...HomeRoutes,
    ...ManagementListProjectsRoutes,
    ...DataListProjectsRoutes,
    ...ViewRecordsRoutes
];
