import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { BiosysCoreModule } from '../../../biosys-core/biosys-core.module';
import { ManagementListProjectsComponent } from './list-projects.component';
import { ConfirmationService, DataTableModule, DialogModule, ButtonModule, GrowlModule,
    ConfirmDialogModule } from 'primeng/primeng';

@NgModule({
    imports: [CommonModule, BiosysCoreModule, SharedModule, DataTableModule, DialogModule, ButtonModule, GrowlModule,
        ConfirmDialogModule],
    declarations: [ManagementListProjectsComponent],
    exports: [ManagementListProjectsComponent],
    providers: [ConfirmationService]
})
export class ManagementListProjectsModule {
}
