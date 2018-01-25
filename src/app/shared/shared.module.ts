import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/index';
import { NavbarComponent } from './navbar/index';
import { BreadcrumbsComponent } from './breadcrumbs/index';
import { FeatureMapComponent, MarkerDirective } from './featuremap/index';
import { TruncatePipe } from './pipes/index';
import { PyToAngularDateFormatConversionPipe, PyToPrimeDateFormatConversionPipe } from './pipes/date-conversion.pipe';
import { APIService } from './services/api/index';
import { ButtonModule, MenubarModule, BreadcrumbModule, MessagesModule, ProgressBarModule } from 'primeng/primeng';
import { SharedModule as PrimeSharedModule } from 'primeng/primeng';
import { FileuploaderComponent } from './fileuploader/fileuploader.component';
import { ExpandableMessagesComponent } from './expandablemessages/expandablemessages.component';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
    imports: [CommonModule, RouterModule, MenubarModule, BreadcrumbModule, ButtonModule, MessagesModule,
        ProgressBarModule, PrimeSharedModule],
    declarations: [HeaderComponent, NavbarComponent, BreadcrumbsComponent, FeatureMapComponent, FileuploaderComponent,
        MarkerDirective, TruncatePipe, PyToAngularDateFormatConversionPipe, PyToPrimeDateFormatConversionPipe,
        ExpandableMessagesComponent],
    exports: [CommonModule, FormsModule, RouterModule, HeaderComponent, NavbarComponent, BreadcrumbsComponent,
        ExpandableMessagesComponent, FeatureMapComponent, FileuploaderComponent, MarkerDirective, TruncatePipe,
        PyToAngularDateFormatConversionPipe, PyToPrimeDateFormatConversionPipe
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [APIService]
        };
    }
}
