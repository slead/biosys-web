import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table'; // may get moved back to primeng/api at some point

import { SharedModule } from '../../shared/shared.module';

import { ManagementListProjectsComponent } from './list-projects/list-projects.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { EditDatasetComponent } from './edit-dataset/edit-dataset.component';
import { EditSiteComponent } from './edit-site/edit-site.component';
import { UploadSitesComponent } from './upload-sites/upload-sites.component';
import { EditProgramComponent } from './edit-program/edit-program.component';
import { ListProgramsComponent } from './list-programs/list-programs.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageModule } from 'primeng/message';
import { ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        InputTextModule,
        InputTextareaModule,
        ButtonModule,
        DropdownModule,
        ToastModule,
        ConfirmDialogModule,
        FileUploadModule,
        DialogModule,
        MultiSelectModule,
        CheckboxModule,
        MessageModule,
        TableModule
    ],
    declarations: [ListProgramsComponent, ManagementListProjectsComponent, EditProgramComponent,
        EditProjectComponent, EditDatasetComponent, EditSiteComponent, UploadSitesComponent],
    providers: [ConfirmationService]
})
export class AdministrationModule {
}
