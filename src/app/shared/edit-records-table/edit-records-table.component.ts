import { Component, Input, OnDestroy, ViewChild } from '@angular/core';

import * as moment from 'moment/moment';

import { APIError, Dataset, Record, RecordResponse } from '../../biosys-core/interfaces/api.interfaces';
import { pyDateFormatToMomentDateFormat } from '../../biosys-core/utils/functions';
import { APIService } from '../../biosys-core/services/api.service';
import { ConfirmationService, DataTable, LazyLoadEvent, Message, SelectItem } from 'primeng/primeng';
import { AMBIGUOUS_DATE_PATTERN } from '../../biosys-core/utils/consts';

@Component({
    selector: 'biosys-edit-records-table',
    templateUrl: './edit-records-table.component.html',
    styleUrls: ['./edit-records-table.component.css']
})
export class EditRecordsTableComponent implements OnDestroy {
    private static DATETIME_FORMAT = 'DD/MM/YYYY H:mm:ss';
    private static FIXED_COLUMNS_TOTAL_WIDTH: number = 240;
    private static COLUMN_WIDTH: number = 240;
    private static CHAR_LENGTH_MULTIPLIER: number = 8;
    private static DATE_FIELD_FIXED_CHARACTER_COUNT = 8;
    private static PADDING: number = 50;

    public selectedRecords: number[] = [];
    public recordsTableColumnWidths: { [key: string]: number } = {};
    public flatRecords: any[];
    public totalRecords: number = 0;
    public dropdownItems: any = {};
    public messages: Message[] = [];

    // TODO: this should be an output as well
    @Input()
    public pageState: any;

    @Input()
    set dataset(dataset: Dataset) {
        if (dataset) {
            this._dataset = dataset;

            if (sessionStorage.getItem('pageState' + this.dataset.id) !== null) {
                this.pageState = JSON.parse(sessionStorage.getItem('pageState' + this.dataset.id));
            }

            // force initial lazy load
            this.recordsDatatable.onLazyLoad.emit(this.recordsDatatable.createLazyLoadMetadata());
        }
    }

    get dataset() {
        return this._dataset;
    }

    @Input()
    set selectAllRecords(selected: boolean) {
        this.isAllRecordsSelected = selected;
        this.selectedRecords = selected ? this.flatRecords.map((record: Record) => record.id) : [];
    }

    get selectAllRecords(): boolean {
        return this.isAllRecordsSelected;
    }

    @ViewChild(DataTable)
    public recordsDatatable: DataTable;

    private _dataset: Dataset;
    private isAllRecordsSelected: boolean = false;
    private editingRowEvent: any;
    private previousRowData: any;

    constructor(private apiService: APIService, private confirmationService: ConfirmationService) {
    }

    public ngOnDestroy() {
        if (this._dataset) {
            sessionStorage.setItem('pageState' + this._dataset.id, JSON.stringify(this.pageState));
        }
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

        this.apiService.getRecordsByDatasetId(this._dataset.id, params)
            .subscribe(
                (data: RecordResponse) => {
                    this.flatRecords = this.formatFlatRecords(data.results);
                    this.totalRecords = data.count;
                    this.recordsTableColumnWidths = {};
                },
                (error: APIError) => console.log('error.msg', error.msg)
            );
    }

    public onPageChange(event) {
        this.pageState.rowOffset = event.first;
        this.pageState.rowLimit = event.rows;
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
        for (let field of this._dataset.data_package.resources[0].schema.fields) {
            if (field.type === 'date' && data[field.name]) {
                data[field.name] = moment(data[field.name]).format(pyDateFormatToMomentDateFormat(field.format));
            }
        }

        this.apiService.updateRecordDataField(this.editingRowEvent.data.id, data, true).subscribe(
            (record: Record) => {
                // TODO: Notify parent of marker change
                // let marker = this.markersByRecordId[record.id];
                // marker.setLatLng(this.recordToLatLng(record));
                // this.markers.refreshClusters([marker]);
            },
            (error: APIError) => {
                // this.showUpdateError(error);
                // revert data
                if (this.previousRowData) {
                    let flatRecord = this.flatRecords[event.index];
                    for (let prop in this.previousRowData) {
                        if (this.previousRowData.hasOwnProperty(prop)) {
                            flatRecord[prop] = this.previousRowData[prop];
                        }
                    }
                }
            }
        );
    }

    public getDropdownOptions(fieldName: string, options: string[]): SelectItem[] {
        if (!(fieldName in this.dropdownItems)) {
            this.dropdownItems[fieldName] = options.map(option => ({'label': option, 'value': option}));
        }

        return this.dropdownItems[fieldName];
    }

    public confirmDeleteSelectedRecords() {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete selected records?',
            accept: () => {
                this.apiService.deleteRecords(this._dataset.id, this.selectedRecords)
                    .subscribe(
                        () => this.onDeleteRecordsSuccess(),
                        (error: APIError) => this.onDeleteRecordError(error)
                    );
            }
        });
    }

    public confirmDeleteAllRecords() {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete all records for this dataset?',
            accept: () => {
                this.apiService.deleteAllRecords(this._dataset.id)
                    .subscribe(
                        () => this.onDeleteRecordsSuccess(),
                        (error: APIError) => this.onDeleteRecordError(error)
                    );
            }
        });
    }

    public getRecordsTableWidth(): any {
        if (!Object.keys(this.recordsTableColumnWidths).length) {
            return {width: '100%'};
        }

        const width = Object.keys(this.recordsTableColumnWidths)
            .map((key) => this.recordsTableColumnWidths[key]).reduce((a, b) => a + b) + EditRecordsTableComponent.FIXED_COLUMNS_TOTAL_WIDTH;

        return {width: width + 'px'};
    }

    public getRecordsTableColumnWidth(fieldName: string): any {
        let width: number;

        if (!this.flatRecords || this.flatRecords.length === 0) {
            width = EditRecordsTableComponent.COLUMN_WIDTH;
        } else {
            if (!(fieldName in this.recordsTableColumnWidths)) {
                const maxCharacterLength = Math.max(fieldName.length,
                    this.flatRecords.map((r) => r[fieldName] ? (r[fieldName] instanceof Date ?
                        EditRecordsTableComponent.DATE_FIELD_FIXED_CHARACTER_COUNT : r[fieldName].length) : 0).
                            reduce((a, b) => Math.max(a, b)));

                this.recordsTableColumnWidths[fieldName] =
                    maxCharacterLength * EditRecordsTableComponent.CHAR_LENGTH_MULTIPLIER + EditRecordsTableComponent.PADDING;
            }

            width = this.recordsTableColumnWidths[fieldName];
        }

        return {width: width + 'px'};
    }

    private formatFlatRecords(records: Record[]) {
        let flatRecords = records.map((r: Record) => Object.assign({
            id: r.id,
            file_name: r.source_info ? r.source_info.file_name : 'Manually created',
            row: r.source_info ? r.source_info.row : '',
            created: moment(r.created).format(EditRecordsTableComponent.DATETIME_FORMAT),
            last_modified: moment(r.last_modified).format(EditRecordsTableComponent.DATETIME_FORMAT),
            geometry: r.geometry
        }, r.data));

        for (let field of this._dataset.data_package.resources[0].schema.fields) {
            if (field.type === 'date') {
                for (let record of flatRecords) {
                    // If date in DD?MM?YYYY format (where ? is any single char), convert to American (as Chrome, Firefox
                    // and IE expect this when creating Date from a string
                    let dateString: string = record[field.name];

                    // use '-' rather than '_' in case '_' is used as the separator
                    dateString = dateString.replace(/_/g, '-');

                    let regexGroup: string[] = dateString.match(AMBIGUOUS_DATE_PATTERN);
                    if (regexGroup) {
                        dateString = regexGroup[2] + '/' + regexGroup[1] + '/' + regexGroup[3];
                    }
                    record[field.name] = new Date(dateString);
                }
            }
        }

        return flatRecords;
    }

    private onDeleteRecordsSuccess() {
        // reload table page without resetting pagination/ordering/search params unlike reset()
        this.recordsDatatable.onLazyLoad.emit(this.recordsDatatable.createLazyLoadMetadata());

        // TODO: Notify parent to reload the markers
        // this.loadRecordMarkers();

        this.messages.push({
            severity: 'success',
            summary: 'Record(s) deleted',
            detail: 'The record(s) was deleted'
        });
    }

    private onDeleteRecordError(error: APIError) {
        this.messages.push({
            severity: 'error',
            summary: 'Record delete error',
            detail: 'There were error(s) deleting the site(s): ' + error.msg
        });
    }
}
