import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmationService, DataTableModule, DialogModule, ButtonModule, GrowlModule, MessagesModule, InputTextModule,
    ConfirmDialogModule, CalendarModule, DropdownModule, FileUploadModule, CheckboxModule, TooltipModule }
    from 'primeng/primeng';

import { BiosysCoreModule } from '../../biosys-core/biosys-core.module';

import { SharedModule } from '../../shared/shared.module';

import { DataListProjectsComponent } from './list-projects/list-projects.component';
import { ListDatasetsComponent } from './list-datasets/list-datasets.component';
import { ManageDataComponent } from './manage-data/manage-data.component';
import { EditRecordComponent } from './edit-record/edit-record.component';


@NgModule({
    imports: [CommonModule, SharedModule, BiosysCoreModule, DataTableModule, DialogModule, ButtonModule, GrowlModule,
        MessagesModule, ConfirmDialogModule, CalendarModule, DropdownModule, FileUploadModule, CheckboxModule,
        InputTextModule, TooltipModule],
    declarations: [DataListProjectsComponent, ListDatasetsComponent, ManageDataComponent, EditRecordComponent],
    // exports: [EditRecordComponent],
    providers: [ConfirmationService]
})
export class DataModule {
}
