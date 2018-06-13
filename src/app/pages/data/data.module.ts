import { NgModule } from '@angular/core';

import {
    ConfirmationService, DataTableModule, DialogModule, ButtonModule, GrowlModule, MessagesModule, InputTextModule,
    ConfirmDialogModule, CalendarModule, DropdownModule, FileUploadModule, CheckboxModule, TooltipModule, GalleriaModule
}
    from 'primeng/primeng';

import { SharedModule } from '../../shared/shared.module';

import { DataListProjectsComponent } from './list-projects/list-projects.component';
import { ListDatasetsComponent } from './list-datasets/list-datasets.component';
import { ManageDataComponent } from './manage-data/manage-data.component';
import { EditRecordComponent } from './edit-record/edit-record.component';


@NgModule({
    imports: [SharedModule, DataTableModule, DialogModule, ButtonModule, GrowlModule,
        MessagesModule, ConfirmDialogModule, CalendarModule, DropdownModule, FileUploadModule, CheckboxModule,
        InputTextModule, TooltipModule, GalleriaModule],
    declarations: [DataListProjectsComponent, ListDatasetsComponent, ManageDataComponent, EditRecordComponent],
    providers: [ConfirmationService]
})
export class DataModule {
}
