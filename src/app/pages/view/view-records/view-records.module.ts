import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { ViewRecordsComponent } from './view-records.component';
import { APIService } from '../../../biosys-core/services/api.service';
import { DataTableModule, DialogModule, ButtonModule, DropdownModule, CalendarModule, RadioButtonModule } from
    'primeng/primeng';

@NgModule({
    imports: [CommonModule, SharedModule, DataTableModule, DialogModule, ButtonModule, DropdownModule,
        CalendarModule, RadioButtonModule],
    declarations: [ViewRecordsComponent],
    exports: [ViewRecordsComponent],
    providers: [APIService]
})
export class ViewRecordsModule {
}
