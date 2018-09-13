import { Routes } from '@angular/router';
import { AccountsRoutes } from './pages/accounts/accounts.routes';
import { HomeRoutes } from './pages/home/home.routes';
import { AdministrationRoutes } from './pages/administration/administration.routes';
import { DataListProjectsRoutes } from './pages/data-management/list-projects/list-projects.routes';
import { ViewRecordsRoutes } from './pages/data-view-export/view-records/view-records.routes';

export const routes: Routes = [
    ...AccountsRoutes,
    ...HomeRoutes,
    ...AdministrationRoutes,
    ...DataListProjectsRoutes,
    ...ViewRecordsRoutes
];
