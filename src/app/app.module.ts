import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { BiosysCoreModule } from './biosys-core/biosys-core.module';
import { APIService } from './biosys-core/services/api.service';
import { AuthService } from './biosys-core/services/auth.service';
import { AuthGuard } from './biosys-core/services/auth.guard';
import { ApiInterceptor } from './biosys-core/services/api.interceptor';

import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { routes } from './app.routes';

import { SSOAuthService } from './shared/services/sso-auth.service';
import { SSOAuthGuard } from './shared/services/sso-auth.guard';

import { LoginModule } from './pages/login/login.module';
import { HomeModule } from './pages/home/home.module';
import { DataModule } from './pages/data/data.module';
import { ManagementModule } from './pages/management/management.module';
import { ViewModule } from './pages/view/view.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(routes),
        BiosysCoreModule,
        SharedModule,
        LoginModule,
        HomeModule,
        ManagementModule,
        DataModule,
        ViewModule
    ],
    providers: [
        APIService,
        {
            provide: AuthService,
            useClass: SSOAuthService
        },
        {
            provide: AuthGuard,
            useClass: SSOAuthGuard
        },
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApiInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
