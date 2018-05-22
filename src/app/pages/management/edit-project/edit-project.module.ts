import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BiosysCoreModule } from '../../../biosys-core/biosys-core.module';
import { SharedModule } from '../../../shared/shared.module';

import { EditProjectComponent } from './edit-project.component';
import { ConfirmationService, DataTableModule, DialogModule, ButtonModule, DropdownModule, MultiSelectModule,
    InputTextModule, InputTextareaModule, ConfirmDialogModule, GrowlModule, CheckboxModule } from 'primeng/primeng';

@NgModule({
    imports: [CommonModule, BiosysCoreModule, SharedModule, DataTableModule, DialogModule, ButtonModule, CheckboxModule,
        DropdownModule, MultiSelectModule, InputTextModule, InputTextareaModule, ConfirmDialogModule, GrowlModule],
    declarations: [EditProjectComponent],
    exports: [EditProjectComponent],
    providers: [ConfirmationService]
})
export class EditProjectModule {
}
