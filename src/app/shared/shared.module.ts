import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
    ButtonModule, MenubarModule, BreadcrumbModule, MessagesModule, ProgressBarModule, CheckboxModule,
    DropdownModule, CalendarModule, CardModule, FileUploadModule, DialogModule
} from 'primeng/primeng';
import { TableModule } from 'primeng/table'; // may get moved back to primeng/primeng at some point
import { DataViewModule } from 'primeng/dataview'; // may get moved back to primeng/primeng at some point
import { SharedModule as PrimeSharedModule } from 'primeng/primeng';

import { BiosysCoreModule } from '../../biosys-core/biosys-core.module';

import { HeaderComponent } from './header/header.component';
import { JsonEditorComponent } from './jsoneditor/jsoneditor.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FeatureMapComponent, MarkerDirective } from './featuremap/featuremap.component';
import { FileuploaderComponent } from './fileuploader/fileuploader.component';
import { ExpandableMessagesComponent } from './expandablemessages/expandablemessages.component';
import { EditRecordsTableComponent } from './edit-records-table/edit-records-table.component';
import { GalleriaComponent } from './galleria/galleria.component';
import { MediaManagerComponent } from './media-manager/media-manager.component';
import { PyToPrimeDateFormatConversionPipe } from './pipes/date-conversion.pipe';
import { SafePipe } from './pipes/safe.pipe';
import { DefaultValuePipe, FieldLabelPipe, IsHiddenFieldPipe } from './pipes/table-schema.pipe';
import { IsImageFilePipe, IsVideoFilePipe, FileIconUrlPipe, FileNamePipe, FileSizePipe } from './pipes/files.pipe';

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule, MenubarModule, BreadcrumbModule, ButtonModule, MessagesModule,
        ProgressBarModule, CheckboxModule, DropdownModule, CardModule, FileUploadModule, DialogModule, TableModule,
        DataViewModule, CalendarModule, PrimeSharedModule, BiosysCoreModule],
    declarations: [HeaderComponent, JsonEditorComponent, NavbarComponent, BreadcrumbsComponent, FeatureMapComponent,
        FileuploaderComponent, GalleriaComponent, MediaManagerComponent, MarkerDirective,
        PyToPrimeDateFormatConversionPipe, SafePipe, IsImageFilePipe, IsVideoFilePipe, FileIconUrlPipe, FileNamePipe,
        FileSizePipe, IsHiddenFieldPipe, DefaultValuePipe, FieldLabelPipe, ExpandableMessagesComponent,
        EditRecordsTableComponent, GalleriaComponent],
    exports: [CommonModule, FormsModule, RouterModule, BiosysCoreModule, HeaderComponent, JsonEditorComponent,
        NavbarComponent, BreadcrumbsComponent, EditRecordsTableComponent, ExpandableMessagesComponent,
        FeatureMapComponent, FileuploaderComponent, GalleriaComponent, MediaManagerComponent, MarkerDirective,
        PyToPrimeDateFormatConversionPipe, SafePipe, IsHiddenFieldPipe, DefaultValuePipe, FieldLabelPipe
    ]
})
export class SharedModule {
}
