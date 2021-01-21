import { NgModule } from '@angular/core';

import { TableModule } from 'primeng/table'; // may get moved back to primeng/api at some point
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { GalleriaModule } from 'primeng/galleria';
import { ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { SharedModule } from '../../shared/shared.module';
import { DataListProjectsComponent } from './list-projects/list-projects.component';
import { ListDatasetsComponent } from './list-datasets/list-datasets.component';
import { ManageDataComponent } from './manage-data/manage-data.component';
import { EditRecordComponent } from './edit-record/edit-record.component';



@NgModule({
    imports: [SharedModule, DialogModule, ButtonModule, ToastModule, MessagesModule, ConfirmDialogModule,
        CalendarModule, DropdownModule, FileUploadModule, CheckboxModule, InputTextModule, TooltipModule,
        GalleriaModule, TableModule],
    declarations: [DataListProjectsComponent, ListDatasetsComponent, ManageDataComponent, EditRecordComponent],
    providers: [ConfirmationService]
})
export class DataManagementModule {
}
