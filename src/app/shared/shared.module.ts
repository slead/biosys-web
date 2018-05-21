import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FeatureMapComponent, MarkerDirective } from './featuremap/featuremap.component';
import { PyToPrimeDateFormatConversionPipe } from './pipes/date-conversion.pipe';
import { ButtonModule, MenubarModule, BreadcrumbModule, MessagesModule, ProgressBarModule } from 'primeng/primeng';
import { SharedModule as PrimeSharedModule } from 'primeng/primeng';
import { FileuploaderComponent } from './fileuploader/fileuploader.component';
import { ExpandableMessagesComponent } from './expandablemessages/expandablemessages.component';


@NgModule({
    imports: [CommonModule, RouterModule, MenubarModule, BreadcrumbModule, ButtonModule, MessagesModule,
        ProgressBarModule, PrimeSharedModule],
    declarations: [HeaderComponent, NavbarComponent, BreadcrumbsComponent, FeatureMapComponent, FileuploaderComponent,
        MarkerDirective, PyToPrimeDateFormatConversionPipe, ExpandableMessagesComponent],
    exports: [CommonModule, FormsModule, RouterModule, HeaderComponent, NavbarComponent, BreadcrumbsComponent,
        ExpandableMessagesComponent, FeatureMapComponent, FileuploaderComponent, MarkerDirective,
        PyToPrimeDateFormatConversionPipe
    ]
})
export class SharedModule {}
