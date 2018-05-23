import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputTextModule, InputTextareaModule, ButtonModule, DropdownModule, GrowlModule, ConfirmDialogModule,
    ConfirmationService, FileUploadModule, DialogModule } from 'primeng/primeng';

import { SharedModule } from '../../../shared/shared.module';
import { EditDatasetComponent } from './edit-dataset.component';

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
        DialogModule
    ],
    declarations: [EditDatasetComponent],
    exports: [EditDatasetComponent],
    providers: [ConfirmationService]
})
export class EditDatasetModule {
}
