import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { JsonEditorComponent } from './jsoneditor/jsoneditor.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FeatureMapComponent, MarkerDirective } from './featuremap/featuremap.component';
import { FileuploaderComponent } from './fileuploader/fileuploader.component';
import { ExpandableMessagesComponent } from './expandablemessages/expandablemessages.component';
import { EditRecordsTableComponent } from './edit-records-table/edit-records-table.component';
import { PyToPrimeDateFormatConversionPipe } from './pipes/date-conversion.pipe';
import { SafePipe } from './pipes/safe.pipe';

import {
    ButtonModule, MenubarModule, BreadcrumbModule, MessagesModule, ProgressBarModule, CheckboxModule,
    DropdownModule, CalendarModule
} from 'primeng/primeng';
import { TableModule } from 'primeng/table'; // may get moved back to primeng/primeng at some point
import { SharedModule as PrimeSharedModule } from 'primeng/primeng';
import { BiosysCoreModule } from '../../biosys-core/biosys-core.module';
import { GalleriaComponent } from './galleria/galleria.component';
import { DefaultValuePipe, FieldLabelPipe, IsHiddenFieldPipe } from './pipes/table-schema.pipe';


@NgModule({
    imports: [CommonModule, FormsModule, RouterModule, MenubarModule, BreadcrumbModule, ButtonModule, MessagesModule,
        ProgressBarModule, CheckboxModule, DropdownModule, TableModule, CalendarModule, PrimeSharedModule,
        BiosysCoreModule],
    declarations: [HeaderComponent, JsonEditorComponent, NavbarComponent, BreadcrumbsComponent, FeatureMapComponent,
        FileuploaderComponent, GalleriaComponent, MarkerDirective, PyToPrimeDateFormatConversionPipe, SafePipe,
        IsHiddenFieldPipe, DefaultValuePipe, FieldLabelPipe, ExpandableMessagesComponent, EditRecordsTableComponent, GalleriaComponent],
    exports: [CommonModule, FormsModule, RouterModule, BiosysCoreModule, HeaderComponent, JsonEditorComponent,
        NavbarComponent, BreadcrumbsComponent, EditRecordsTableComponent, ExpandableMessagesComponent,
        FeatureMapComponent, FileuploaderComponent, GalleriaComponent, MarkerDirective,
        PyToPrimeDateFormatConversionPipe, SafePipe, IsHiddenFieldPipe, DefaultValuePipe, FieldLabelPipe
    ]
})
export class SharedModule {
}
