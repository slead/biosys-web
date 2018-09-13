import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    DialogModule, ButtonModule, CheckboxModule, DropdownModule, CalendarModule, RadioButtonModule, ProgressSpinnerModule
} from 'primeng/primeng';
import { TableModule } from 'primeng/table'; // may get moved back to primeng/primeng at some point

import { SharedModule } from '../../shared/shared.module';

import { ViewRecordsComponent } from './view-records/view-records.component';


@NgModule({
    imports: [CommonModule, SharedModule, DialogModule, ButtonModule, CheckboxModule, DropdownModule, CalendarModule,
        RadioButtonModule, ProgressSpinnerModule, TableModule],
    declarations: [ViewRecordsComponent]
})
export class DataViewExportModule {
}
