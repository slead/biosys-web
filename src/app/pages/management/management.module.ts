import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputTextModule, InputTextareaModule, ButtonModule, DropdownModule, GrowlModule, ConfirmDialogModule, ConfirmationService,
    FileUploadModule, DialogModule, DataTableModule, MultiSelectModule, CheckboxModule, MessageModule } from 'primeng/primeng';

import { BiosysCoreModule } from '../../biosys-core/biosys-core.module';
import { SharedModule } from '../../shared/shared.module';

import { ManagementListProjectsComponent } from './list-projects/list-projects.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { EditDatasetComponent } from './edit-dataset/edit-dataset.component';
import { EditSiteComponent } from './edit-site/edit-site.component';
import { UploadSitesComponent } from './upload-sites/upload-sites.component';

@NgModule({
    imports: [
        CommonModule,
        BiosysCoreModule,
        SharedModule,
        InputTextModule,
        InputTextareaModule,
        ButtonModule,
        DropdownModule,
        GrowlModule,
        ConfirmDialogModule,
        FileUploadModule,
        DialogModule,
        DataTableModule,
        MultiSelectModule,
        CheckboxModule,
        MessageModule
    ],
    declarations: [ManagementListProjectsComponent, EditProjectComponent, EditDatasetComponent, EditSiteComponent, UploadSitesComponent],
    providers: [ConfirmationService]
})
export class ManagementModule {
}
