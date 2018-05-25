import { Component, Input, OnInit } from '@angular/core';

import * as moment from 'moment/moment';

import {APIError, Dataset, Record, RecordResponse} from '../../biosys-core/interfaces/api.interfaces';
import { pyDateFormatToMomentDateFormat } from '../../biosys-core/utils/functions';
import { APIService } from '../../biosys-core/services/api.service';
import {LazyLoadEvent} from 'primeng/primeng';

@Component({
    selector: 'biosys-edit-records-table',
    templateUrl: './edit-records-table.component.html',
    styleUrls: ['./edit-records-table.component.css']
})
export class EditRecordsTableComponent implements OnInit {
    public selectedRecords: number[] = [];
    public recordsTableColumnWidths: { [key: string]: number } = {};
    public flatRecords: any[];
    public totalRecords: number = 0;

    @Input()
    dataset: Dataset;

    @Input()
    set selectAllRecords(selected: boolean) {
        this.isAllRecordsSelected = selected;
        this.selectedRecords = selected ? this.flatRecords.map((record: Record) => record.id) : [];
    }

    get selectAllRecords(): boolean {
        return this.isAllRecordsSelected;
    }

    private isAllRecordsSelected: boolean = false;
    private editingRowEvent: any;
    private previousRowData: any;

    constructor(private apiService: APIService) {
    }

    ngOnInit() {
    }

    public loadRecordsLazy(event: LazyLoadEvent) {
        let params: any = {};

        if (event.first !== undefined && event.first > -1) {
            params['offset'] = event.first;
        }
        if (event.rows) {
            params['limit'] = event.rows;
        }
        if (event.sortField) {
            params['ordering'] = (event.sortOrder && event.sortOrder < 0) ? '-' + event.sortField : event.sortField;
        }
        if (event.globalFilter) {
            params['search'] = event.globalFilter;
        }

        // this.apiService.getRecordsByDatasetId(this.datasetId, params)
        //     .subscribe(
        //         (data: RecordResponse) => {
        //             this.flatRecords = this.formatFlatRecords(data.results);
        //             this.totalRecords = data.count;
        //             this.recordsTableColumnWidths = {};
        //         },
        //         (error: APIError) => console.log('error.msg', error.msg)
        //     );
    }

    // Regarding next three methods - onEditComplete event doesn't recognize changing calendar date or dropdown item
    // change but does recognize starting to edit these fields, so need to keep a reference to the event, in this case
    // 'editingRowEvent'. This event contains a reference to the data of the row (i.e. the record) and will have the
    // latest (post-edited) data, which can be used to update the record by manually calling onRowEditComplete when the
    // calendar or dropdown have changed, as in onRecordDateSelect and onRecordDropdownSelect methods.

    public onRowEditInit(event: any) {
        this.editingRowEvent = event;
        this.previousRowData = JSON.parse(JSON.stringify(event.data));
    }

    public onRecordDateSelect() {
        this.onRowEditComplete(null);
    }

    public onRecordDropdownSelect() {
        this.onRowEditComplete(null);
    }

    public onRowEditComplete(event: any) {
        let data: any = JSON.parse(JSON.stringify(this.editingRowEvent.data));
        for (let key of ['created', 'file_name', 'geometry', 'id', 'last_modified', 'row']) {
            delete data[key];
        }

        // convert Date types back to string in field's specified format (or DD/MM/YYYY if unspecified)
        for (let field of this.dataset.data_package.resources[0].schema.fields) {
            if (field.type === 'date' && data[field.name]) {
                data[field.name] = moment(data[field.name]).format(pyDateFormatToMomentDateFormat(field.format));
            }
        }

        // this.apiService.updateRecordDataField(this.editingRowEvent.data.id, data, true).subscribe(
        //     (record: Record) => {
        //         let marker = this.markersByRecordId[record.id];
        //         marker.setLatLng(this.recordToLatLng(record));
        //         this.markers.refreshClusters([marker]);
        //     },
        //     (error: APIError) => {
        //         this.showUpdateError(error);
        //         // revert data
        //         if (this.previousRowData) {
        //             let flatRecord = this.flatRecords[event.index];
        //             for (let prop in this.previousRowData) {
        //                 if (this.previousRowData.hasOwnProperty(prop)) {
        //                     flatRecord[prop] = this.previousRowData[prop];
        //                 }
        //             }
        //         }
        //     }
        // );
    }
}
