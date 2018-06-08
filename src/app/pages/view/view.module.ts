import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    DataTableModule,
    DialogModule,
    ButtonModule,
    CheckboxModule,
    DropdownModule,
    CalendarModule,
    RadioButtonModule,
    ProgressSpinnerModule
}
    from 'primeng/primeng';

import { SharedModule } from '../../shared/shared.module';

import { ViewRecordsComponent } from './view-records/view-records.component';


@NgModule({
    imports: [CommonModule, SharedModule, DataTableModule, DialogModule, ButtonModule, CheckboxModule, DropdownModule,
        CalendarModule, RadioButtonModule, ProgressSpinnerModule],
    declarations: [ViewRecordsComponent]
})
export class ViewModule {
}
