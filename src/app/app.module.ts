import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { routes } from './app.routes';
import { LoginModule } from './pages/login/login.module';
import { HomeModule } from './pages/home/home.module';
import { AuthGuard } from './shared/auth.guard';
import { ApiInterceptor } from './shared/api.interceptor';
import { SharedModule } from './shared/shared.module';
import * as management from './pages/management/index';
import * as data from './pages/data/index';
import * as view from './pages/view/index';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(routes),
        SharedModule,
        LoginModule,
        HomeModule,
        management.ManagementListProjectsModule,
        management.EditProjectModule,
        management.EditDatasetModule,
        management.UploadSitesModule,
        management.EditSiteModule,
        data.DataListProjectsModule,
        data.ListDatasetsModule,
        data.ManageDataModule,
        data.EditRecordModule,
        view.ViewRecordsModule
    ],
    providers: [
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApiInterceptor,
            multi: true
        },
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
