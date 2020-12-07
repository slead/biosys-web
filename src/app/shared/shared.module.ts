import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TableModule } from 'primeng/table'; // may get moved back to primeng/api at some point
import { DataViewModule } from 'primeng/dataview'; // may get moved back to primeng/api at some point
import { SharedModule as PrimeSharedModule } from 'primeng/api';
import { ProgressBarModule } from 'primeng/progressbar';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { MenubarModule } from 'primeng/menubar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';


import { BiosysCoreModule } from '../../biosys-core/biosys-core.module';

import { HeaderComponent } from './header/header.component';
import { JsonEditorComponent } from './jsoneditor/jsoneditor.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FeatureMapComponent, MarkerDirective } from './featuremap/featuremap.component';
import { FileUploaderComponent } from './fileuploader/file-uploader.component';
import { ExpandableMessagesComponent } from './expandablemessages/expandablemessages.component';
import { EditRecordsTableComponent } from './edit-records-table/edit-records-table.component';
import { MediaManagerComponent } from './media-manager/media-manager.component';
import { PyToPrimeDateFormatConversionPipe } from './pipes/date-conversion.pipe';
import { SafePipe } from './pipes/safe.pipe';
import { DefaultValuePipe, FieldLabelPipe, IsHiddenFieldPipe } from './pipes/table-schema.pipe';
import { IsImageFilePipe, IsVideoFilePipe, FileIconUrlPipe, FileNamePipe, FileSizePipe } from './pipes/files.pipe';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';


@NgModule({
    imports: [CommonModule, FormsModule, RouterModule, MenubarModule, BreadcrumbModule, ButtonModule, MessagesModule,
        ProgressBarModule, InputTextModule, CheckboxModule, DropdownModule, CardModule, FileUploadModule, RippleModule, DialogModule,
        TableModule, DataViewModule, CalendarModule, PrimeSharedModule, BiosysCoreModule],
    declarations: [HeaderComponent, JsonEditorComponent, NavbarComponent, BreadcrumbsComponent, FeatureMapComponent,
        FileUploaderComponent, MediaManagerComponent, MarkerDirective,
        PyToPrimeDateFormatConversionPipe, SafePipe, IsImageFilePipe, IsVideoFilePipe, FileIconUrlPipe, FileNamePipe,
        FileSizePipe, IsHiddenFieldPipe, DefaultValuePipe, FieldLabelPipe, ExpandableMessagesComponent,
        EditRecordsTableComponent],
    exports: [CommonModule, FormsModule, RouterModule, BiosysCoreModule, HeaderComponent, JsonEditorComponent,
        NavbarComponent, BreadcrumbsComponent, EditRecordsTableComponent, ExpandableMessagesComponent,
        FeatureMapComponent, FileUploaderComponent, MediaManagerComponent, MarkerDirective,
        PyToPrimeDateFormatConversionPipe, SafePipe, IsHiddenFieldPipe, DefaultValuePipe, FieldLabelPipe
    ]
})
export class SharedModule {
}
