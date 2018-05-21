import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BiosysCoreModule } from '../../../biosys-core/biosys-core.module';

import { SharedModule } from '../../../shared/shared.module';
import { DataListProjectsComponent } from './list-projects.component';
import { DataTableModule, DialogModule, ButtonModule } from 'primeng/primeng';

@NgModule({
    imports: [CommonModule, BiosysCoreModule, SharedModule, DataTableModule, DialogModule, ButtonModule],
    declarations: [DataListProjectsComponent],
    exports: [DataListProjectsComponent]
})
export class DataListProjectsModule {
}
