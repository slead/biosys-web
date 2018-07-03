import { Routes } from '@angular/router';
import { LoginRoutes } from './pages/login/login.routes';
import { HomeRoutes } from './pages/home/home.routes';
import { ManagementRoutes } from './pages/management/management.routes';
import { DataListProjectsRoutes } from './pages/data/list-projects/list-projects.routes';
import { ViewRecordsRoutes } from './pages/view/view-records/view-records.routes';

export const routes: Routes = [
    ...LoginRoutes,
    ...HomeRoutes,
    ...ManagementRoutes,
    ...DataListProjectsRoutes,
    ...ViewRecordsRoutes
];
