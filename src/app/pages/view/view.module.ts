import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataTableModule, DialogModule, ButtonModule, DropdownModule, CalendarModule }
    from 'primeng/primeng';

import { SharedModule } from '../../shared/shared.module';

import { ViewRecordsComponent } from './view-records/view-records.component';


@NgModule({
    imports: [CommonModule, SharedModule, DataTableModule, DialogModule, ButtonModule, DropdownModule,
        CalendarModule],
    declarations: [ViewRecordsComponent],
    // exports: [ViewRecordsComponent],
})
export class ViewModule {
}
