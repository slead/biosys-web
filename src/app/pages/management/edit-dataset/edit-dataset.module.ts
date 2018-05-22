import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { EditDatasetComponent } from './edit-dataset.component';
import { InputTextModule, InputTextareaModule, ButtonModule, DropdownModule, GrowlModule, ConfirmDialogModule,
    ConfirmationService, FileUploadModule, DialogModule } from 'primeng/primeng';
import { JSONEditorModule } from '../../../shared/jsoneditor/jsoneditor.module';

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
        JSONEditorModule,
    ],
    declarations: [EditDatasetComponent],
    exports: [EditDatasetComponent],
    providers: [ConfirmationService]
})
export class EditDatasetModule {
}
