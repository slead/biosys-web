import { Component, OnInit, ViewChild } from '@angular/core';

import * as moment from 'moment/moment';
import { saveAs } from 'file-saver';

import { mergeMap } from 'rxjs/operators';
import { from } from 'rxjs/observable/from';
import { forkJoin } from 'rxjs/observable/forkJoin';

import { APIError, Dataset, Record, RecordResponse } from '../../../../biosys-core/interfaces/api.interfaces';
import { APIService } from '../../../../biosys-core/services/api.service';
import { DATASET_TYPE_MAP } from '../../../../biosys-core/utils/consts';
import { SelectItem, DataTable, LazyLoadEvent } from 'primeng/primeng';

@Component({
    moduleId: module.id,
    selector: 'biosys-data-project-list',
    templateUrl: 'view-records.component.html',
    styleUrls: ['view-records.component.css'],
})

export class ViewRecordsComponent implements OnInit {
    private static COLUMN_WIDTH: number = 240;
    private static CHAR_LENGTH_MULTIPLIER: number = 8;
    private static PADDING: number = 50;

    public DATASET_TYPE_MAP: any = DATASET_TYPE_MAP;
    public breadcrumbItems: any = [];
    public projectDropdownItems: SelectItem[] = [{label: 'All Projects', value: null}];
    public projectsMap: any = {};
    public speciesDropdownItems: SelectItem[] = [{label: 'All Species', value: null}];

    public datasets: Dataset[];
    public records: Record[];
    public recordsTableColumnWidths: { [key: string]: number } = {};
    public totalRecords: number = 0;
    public selectedDataset: Dataset;

    public projectId: number;
    public dateStart: Date;
    public dateEnd: Date;
    public publishedOny: boolean = true;
    public includeConsumed: boolean = false;
    public speciesName: string;
    public fileType: string = 'csv';

    public isConsuming: boolean = false;

    private recordParams: any = {};

    @ViewChild('recordsTable')
    public datatable: DataTable;

    constructor(private apiService: APIService) {
    }

    ngOnInit() {
        // projects and datasets
        forkJoin([
            this.apiService.getProjects(),
            this.apiService.getDatasets()
        ]).subscribe(
            (data: any) => {
                let projects = data[0];
                this.datasets = data[1];
                projects.forEach(project => this.projectsMap[project.id] = project.name);
                this.addProjectNameToDatasets();
                this.projectDropdownItems = this.projectDropdownItems.concat(
                    projects.map(project => ({
                        'label': project.name,
                        'value': project.id
                    }))
                );
            },
            (error: APIError) => console.log('error.msg', error.msg)
        );

        this.apiService.getSpecies().subscribe(
            (species: string[]) => this.speciesDropdownItems =
                this.speciesDropdownItems.concat(species.map(s => ({'label': s, 'value': s}))),
            (error: APIError) => console.log('error.msg', error.msg)
        );

        this.breadcrumbItems = [
            {label: 'View and Export Records'},
        ];
    }

    public filter() {
        this.records = null;

        let datasetParams: any = {};
        this.recordParams = {};

        if (this.projectId) {
            datasetParams['project'] = this.projectId;
        }

        if (this.dateStart) {
            datasetParams['record__datetime__gte'] = this.recordParams['datetime__gte'] =
                this.dateStart.toISOString();
        }

        if (this.dateEnd) {
            datasetParams['record__datetime__lte'] = this.recordParams['datetime__lte'] =
                this.dateEnd.toISOString();
        }

        if (this.publishedOny) {
            datasetParams['record__published'] = this.recordParams['published'] = true;
        }

        if (!this.includeConsumed) {
            datasetParams['record__consumed'] = this.recordParams['consumed'] = false;
        }

        if (this.speciesName) {
            datasetParams['record__species_name'] = this.recordParams['species_name'] = this.speciesName;
        }

        this.apiService.getDatasets(datasetParams).subscribe(
            (datasets: Dataset[]) => {
                this.datasets = datasets;
                this.addProjectNameToDatasets();
            },
            (error: APIError) => console.log('error.msg', error.msg)
        );

        if (this.selectedDataset) {
            this.recordParams['dataset__id'] = this.selectedDataset.id;
            if (this.datatable) {
                this.datatable.reset();
            }
        }
    }

    public selectDataset(event: any) {
        this.filter();
    }

    public reset() {
        this.projectId = null;
        this.dateStart = null;
        this.dateEnd = null;
        this.speciesName = null;

        this.filter();
    }

    public loadRecordsLazy(event: LazyLoadEvent) {
        let params = JSON.parse(JSON.stringify(this.recordParams));

        if (event.first !== undefined && event.first > -1) {
            params['offset'] = event.first;
        }
        if (event.rows) {
            params['limit'] = event.rows;
        }
        if (event.sortField) {
            params['ordering'] = (event.sortOrder && event.sortOrder < 0) ? '-' + event.sortField : event.sortField;
        }

        if (this.dateStart) {
            params['datetime__gte'] = this.dateStart.toISOString();
        }

        if (this.dateEnd) {
            params['datetime__lte'] = this.dateEnd.toISOString();
        }

        if (this.speciesName) {
            params['record__species_name'] = this.speciesName;
        }

        this.apiService.getRecordsByDatasetId(this.selectedDataset.id, params)
            .subscribe(
                (data: RecordResponse) => {
                    this.records = data.results;
                    this.totalRecords = data.count;
                    this.recordsTableColumnWidths = {};
                },
                (error: APIError) => console.log('error.msg', error.msg)
            );
    }

    public export() {
        this.apiService.exportRecords(this.dateStart, this.dateEnd, this.speciesName, this.selectedDataset.id,
            this.fileType).subscribe(
            resp => {
                const timeStamp = moment().format('YYYY-MM-DD-HHmmss');
                const extension = this.fileType;
                const fileName = `export_${timeStamp}.${extension}`;
                saveAs(resp, fileName);
            },
            (error: APIError) => console.log('error.msg', error.msg)
        );
    }

    public markAsConsumed() {
        let params = JSON.parse(JSON.stringify(this.recordParams));

        this.isConsuming = true;
        this.apiService.getRecordsByDatasetId(this.selectedDataset.id, params).pipe(
            // map((recordResponse: RecordResponse) => recordResponse.results),
            mergeMap((records: Record[]) => from(records).pipe(
                mergeMap((record: Record) => this.apiService.updateRecordConsumed(record.id, true))
            ))
        ).subscribe({
            error: (error: APIError) => {
                console.log('error.msg', error.msg);
                this.isConsuming = false;
            },
            complete: () => this.isConsuming = false
        });
    }

    public getRecordsTableWidth(): any {
        if (!Object.keys(this.recordsTableColumnWidths).length) {
            return {width: '100%'};
        }

        const width = Object.keys(this.recordsTableColumnWidths).
            map((key) => this.recordsTableColumnWidths[key]).reduce((a, b) => a + b);

        return {width: width + 'px'};
    }

    public getRecordsTableColumnWidth(fieldName: string): any {
        let width: number;

        if (!this.records || this.records.length === 0) {
            width = ViewRecordsComponent.COLUMN_WIDTH;
        } else {
            if (!(fieldName in this.recordsTableColumnWidths)) {
                const maxCharacterLength = Math.max(fieldName.length,
                    this.records.map((r) => r.data[fieldName] ? r.data[fieldName].length : 0)
                        .reduce((a, b) => Math.max(a, b)));

                this.recordsTableColumnWidths[fieldName] =
                    maxCharacterLength * ViewRecordsComponent.CHAR_LENGTH_MULTIPLIER + ViewRecordsComponent.PADDING;
            }

            width = this.recordsTableColumnWidths[fieldName];
        }

        return {width: width + 'px'};
    }

    private addProjectNameToDatasets(): void {
        if (this.datasets && this.projectsMap) {
            this.datasets.forEach(dataset => dataset['projectName'] = this.projectsMap[dataset.project] || '');
        }
    }
}
