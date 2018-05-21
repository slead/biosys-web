import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BiosysCoreModule } from '../../../biosys-core/biosys-core.module';

import { SharedModule } from '../../../shared/shared.module';
import { ManageDataComponent } from './manage-data.component';
import { DataTableModule, ButtonModule, GrowlModule, MessagesModule, FileUploadModule, CheckboxModule, TooltipModule,
    ConfirmDialogModule, DropdownModule, CalendarModule } from 'primeng/primeng';

@NgModule({
    imports: [CommonModule, BiosysCoreModule, SharedModule, DataTableModule, ButtonModule, GrowlModule, MessagesModule,
        FileUploadModule, CheckboxModule, TooltipModule, ConfirmDialogModule, DropdownModule, CalendarModule],
    declarations: [ManageDataComponent],
    exports: [ManageDataComponent]
})
export class ManageDataModule {
}
