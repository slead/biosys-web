import { Component, OnInit, ViewChild } from '@angular/core';
import { APIService, APIError, Dataset, Record, RecordResponse, DATASET_TYPE_MAP } from '../../../shared/index';
import { Router } from '@angular/router';
import { SelectItem, DataTable, LazyLoadEvent } from 'primeng/primeng';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/forkJoin';

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
    public recordsTableColumnWidths: {[key: string]: number} = {};
    public totalRecords: number = 0;
    public selectedDataset: Dataset;

    public projectId: number;
    public dateStart: Date;
    public dateEnd: Date;
    public speciesName: string;

    public exportURL: string;

    @ViewChild('recordsTable')
    public datatable: DataTable;

    constructor(private apiService: APIService, private router: Router) {
    }

    ngOnInit() {
        // projects and datasets
        Observable.forkJoin([
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
        let recordParams: any = {};

        if (this.projectId) {
            datasetParams['project'] = this.projectId;
        }

        if (this.dateStart) {
            datasetParams['record__datetime__start'] = recordParams['datetime__start'] = this.dateStart.toISOString();
        }

        if (this.dateEnd) {
            datasetParams['record__datetime__end'] = recordParams['datetime__end'] = this.dateEnd.toISOString();
        }

        if (this.speciesName) {
            datasetParams['record__species_name'] = recordParams['species_name'] = this.speciesName;
        }

        this.apiService.getDatasets(datasetParams).subscribe(
            (datasets: Dataset[]) => {
                this.datasets = datasets;
                this.addProjectNameToDatasets();
            },
            (error: APIError) => console.log('error.msg', error.msg)
        );

        if (this.selectedDataset) {
            recordParams['dataset__id'] = this.selectedDataset.id;
            if (this.datatable) {
                this.datatable.reset();
            }
        }

        this.exportURL = this.apiService.getRecordExportURL() +
            Object.keys(recordParams).reduce(function(left, right) {
                left.push(right + '=' + encodeURIComponent(recordParams[right]));
                return left;
            }, []).join('&');
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
        this.apiService.getRecordsByDatasetId(this.selectedDataset.id, event.first, event.rows, event.sortField,
            event.sortOrder)
        .subscribe(
            (data: RecordResponse) => {
                this.records = data.results;
                this.totalRecords = data.count;
                this.recordsTableColumnWidths = {};
            },
            (error: APIError) => console.log('error.msg', error.msg)
        );
    }

    public getRecordsTableWidth(): any {
        if (!Object.keys(this.recordsTableColumnWidths).length) {
            return {width: '100%'};
        }

        const width = Object.keys(this.recordsTableColumnWidths).map((key) => this.recordsTableColumnWidths[key]).
            reduce((a, b) => a + b);

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
            this.datasets.forEach(dataset => dataset['projectName'] = this.projectsMap[dataset.project] || '')
        }
    }
}
