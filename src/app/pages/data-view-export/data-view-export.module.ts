import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TableModule} from 'primeng/table'; // may get moved back to primeng/api at some point

import {SharedModule} from '../../shared/shared.module';

import {ViewRecordsComponent} from './view-records/view-records.component';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ProgressSpinnerModule} from 'primeng/progressspinner';


@NgModule({
    imports: [CommonModule, SharedModule, DialogModule, ButtonModule, CheckboxModule, DropdownModule, CalendarModule,
        RadioButtonModule, ProgressSpinnerModule, TableModule],
    declarations: [ViewRecordsComponent]
})
export class DataViewExportModule {
}
