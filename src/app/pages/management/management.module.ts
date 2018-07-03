import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputTextModule, InputTextareaModule, ButtonModule, DropdownModule, GrowlModule, ConfirmDialogModule, ConfirmationService,
    FileUploadModule, DialogModule, MultiSelectModule, CheckboxModule, MessageModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table'; // may get moved back to primeng/primeng at some point

import { SharedModule } from '../../shared/shared.module';

import { ManagementListProjectsComponent } from './list-projects/list-projects.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { EditDatasetComponent } from './edit-dataset/edit-dataset.component';
import { EditSiteComponent } from './edit-site/edit-site.component';
import { UploadSitesComponent } from './upload-sites/upload-sites.component';
import { EditProgramComponent } from './edit-program/edit-program.component';
import { ListProgramsComponent } from './list-programs/list-programs.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        InputTextModule,
        InputTextareaModule,
        ButtonModule,
        DropdownModule,
        GrowlModule,
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
export class ManagementModule {
}
