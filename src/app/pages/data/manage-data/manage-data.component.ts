import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { APIService, APIError, AuthService, FileuploaderComponent, Project, Dataset, Record, RecordResponse,
    DEFAULT_ZOOM, DEFAULT_CENTER, DEFAULT_MARKER_ICON, getDefaultBaseLayer, getOverlayLayers, DEFAULT_GROWL_LIFE,
    DEFAULT_ROW_LIMIT } from '../../../shared/index';
import { Router, ActivatedRoute } from '@angular/router';
import { Message, ConfirmationService, LazyLoadEvent} from 'primeng/primeng';
import * as moment from 'moment/moment';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import '../../../../lib/leaflet.latlng-graticule'

@Component({
    moduleId: module.id,
    selector: 'biosys-data-dataset-list',
    templateUrl: 'manage-data.component.html',
    styleUrls: ['manage-data.component.css'],
})
export class ManageDataComponent implements OnInit, OnDestroy {
    private static COLUMN_WIDTH: number = 240;
    private static CHAR_LENGTH_MULTIPLIER: number = 8;
    private static PADDING: number = 50;
    private static FIXED_COLUMNS_TOTAL_WIDTH: number = 200;
    private static ACCEPTED_TYPES: string[] = [
        'text/csv',
        'text/comma-separated-values',
        'application/csv',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
        'application/vnd.msexcel'
    ];
    private static DATETIME_FORMAT = 'DD/MM/YYYY H:mm:ss';

    public DEFAULT_GROWL_LIFE: number = DEFAULT_GROWL_LIFE;

    @ViewChild(FileuploaderComponent)
    public uploader: FileuploaderComponent;

    @Input()
    set selectAllRecords(selected: boolean) {
        this.isAllRecordsSelected = selected;
        this.selectedRecords = selected ? this.flatRecords.map((record: Record) => record.id) : [];
    }
    get selectAllRecords(): boolean {
        return this.isAllRecordsSelected;
    }

    public selectedRecords: number[] = [];
    public breadcrumbItems: any = [];
    public projId: number;
    public datasetId: number;
    public dataset: Dataset = <Dataset>{};
    public recordsTableColumnWidths: {[key: string]: number} = {};
    public flatRecords: any[];
    public totalRecords: number = 0;
    public messages: Message[] = [];
    public uploadURL: string;
    public isUploading: boolean = false;
    public uploadCreateSites: boolean = false;
    public uploadDeleteExistingRecords: boolean = false;
    public uploadErrorMessages: Message[] = [];
    public uploadWarningMessages: Message[] = [];
    public pageState: any = {
        mapZoom: DEFAULT_ZOOM,
        mapPosition: DEFAULT_CENTER,
        rowOffset: 0,
        rowLimit: DEFAULT_ROW_LIMIT,
    };

    private map: L.Map;
    private markers: L.MarkerClusterGroup;

    private isAllRecordsSelected: boolean = false;

    constructor(private apiService: APIService, private router: Router, private route: ActivatedRoute,
                private confirmationService: ConfirmationService) {
    }

    public ngOnInit() {
        let params = this.route.snapshot.params;

        this.projId = Number(params['projId']);
        this.datasetId = Number(params['datasetId']);

        if (sessionStorage.getItem('pageState' + this.datasetId) !== null) {
            this.pageState = JSON.parse(sessionStorage.getItem('pageState' + this.datasetId));
        }

        this.apiService.getProjectById(this.projId)
        .subscribe(
            (project: Project) => this.breadcrumbItems.splice(1, 0, {
                label: project.name,
                routerLink: ['/data/projects/' + this.projId + '/datasets']
            }),
            (error: APIError) => console.log('error.msg', error.msg)
        );

        this.apiService.getDatasetById(this.datasetId).
        toPromise()
        .then(
            (dataset: Dataset) => {
                this.dataset = dataset;
                this.breadcrumbItems.push({label: this.dataset.name});
                if (dataset.type !== 'generic') {
                    this.initMap();
                }
            },
            (error: APIError) => console.log('error.msg', error.msg)
        );

        this.uploadURL = this.apiService.getRecordsUploadURL(this.datasetId);

        this.breadcrumbItems = [
            {label: 'Enter Records - Projects', routerLink: '/data/projects'}
        ];

        if ('recordSaved' in params) {
            this.messages.push({
                severity: 'success',
                summary: 'Record saved',
                detail: 'The record was saved'
            });
        } else if ('recordDeleted' in params) {
            this.messages.push({
                severity: 'success',
                summary: 'Record deleted',
                detail: 'The record was deleted'
            });
        }

        // for some reason the growls won't disappear if messages populated during init, so need
        // to set a timeout to remove
        setTimeout(() => {
            this.messages = [];
        }, DEFAULT_GROWL_LIFE);
    }

    public ngOnDestroy() {
        if (this.map) {
            this.pageState.mapZoom = this.map.getZoom();
            this.pageState.mapPosition = this.map.getCenter();
        }
        sessionStorage.setItem('pageState' + this.datasetId, JSON.stringify(this.pageState));
    }

    private initMap() {
        this.map = L.map('map', {
            zoom: this.pageState.mapZoom,
            center: this.pageState.mapPosition,
            layers: [getDefaultBaseLayer()]
        });

        this.markers = L.markerClusterGroup();
        this.markers.addTo(this.map);

        L.control.layers(null, getOverlayLayers()).addTo(this.map);

        L.control.mousePosition({emptyString: '', lngFirst: true, separator: ', '}).addTo(this.map);

        L.latlngGraticule().addTo(this.map);

        L.control.scale({imperial: false, position: 'bottomright'}).addTo(this.map);
    }

    public loadRecordsLazy(event: LazyLoadEvent) {
        this.apiService.getRecordsByDatasetId(this.datasetId, event.first, event.rows, event.sortField, event.sortOrder,
            event.globalFilter)
        .subscribe(
            (data: RecordResponse) => {
                this.flatRecords = this.formatFlatRecords(data.results);
                this.totalRecords = data.count;
                this.recordsTableColumnWidths = {};
                if (this.dataset.type !== 'generic') {
                    this.loadRecordMarkers();
                }
            },
            (error: APIError) => console.log('error.msg', error.msg)
        );
    }

    private loadRecordMarkers() {
        for (let record of this.flatRecords) {
            if (record.geometry) {
                let coord: GeoJSON.Position = record.geometry.coordinates as GeoJSON.Position;
                let marker: L.Marker = L.marker(L.GeoJSON.coordsToLatLng([coord[0], coord[1]]),
                    {icon: DEFAULT_MARKER_ICON});
                let popupContent: string = '<p class="m-0">Record ID: <strong>' + record.id + '</strong></p>' +
                    '<p class="mt-1"><a href="#/data/projects/' + this.projId + '/datasets/' + this.datasetId +
                    '/record/' + record.id + '">Edit Record</a></p>';

                marker.bindPopup(popupContent);
                marker.on('mouseover', function () {
                    this.openPopup();
                });
                this.markers.addLayer(marker);
            }
        }
    }

    public getRecordsTableWidth(): any {
        if (!Object.keys(this.recordsTableColumnWidths).length) {
            return {width: '100%'};
        }

        const width = Object.keys(this.recordsTableColumnWidths).map((key) => this.recordsTableColumnWidths[key]).
            reduce((a, b) => a + b) + ManageDataComponent.FIXED_COLUMNS_TOTAL_WIDTH;

        return {width: width + 'px'};
    }

    public getRecordsTableColumnWidth(fieldName: string): any {
        let width: number;

        if (!this.flatRecords || this.flatRecords.length === 0) {
            width = ManageDataComponent.COLUMN_WIDTH;
        } else {
            if (!(fieldName in this.recordsTableColumnWidths)) {
                const maxCharacterLength = Math.max(fieldName.length,
                    this.flatRecords.map((r) => r[fieldName].length).reduce((a, b) => Math.max(a, b)));

                this.recordsTableColumnWidths[fieldName] =
                    maxCharacterLength * ManageDataComponent.CHAR_LENGTH_MULTIPLIER + ManageDataComponent.PADDING;
            }

            width = this.recordsTableColumnWidths[fieldName];
        }

        return {width: width + 'px'};
    }

    public add() {
        this.router.navigate(['/data/projects/' + this.projId + '/datasets/' + this.datasetId + '/create-record/']);
    }

    public confirmDeleteSelectedRecords() {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete all selected records?',
            accept: () => {
                this.apiService.deleteRecords(this.datasetId, this.selectedRecords)
                .subscribe(
                    () => this.onDeleteRecordsSuccess(),
                    (error: APIError) => this.onDeleteRecordError(error)
                );
            }
        });
    }

    public onPageChange(event) {
        this.pageState.rowOffset = event.first;
        this.pageState.rowLimit = event.rows;
    }

    public onUpload(event: any) {
        this.parseAndDisplayResponse(event.xhr.response);
        this.isUploading = false;
        this.flatRecords = null;
        if (this.dataset.type !== 'generic') {
            this.markers.clearLayers();
        }
        this.apiService.getRecordsByDatasetId(this.datasetId, this.pageState.rowOffset, this.pageState.rowLimit)
            .subscribe(
                (data: RecordResponse) => {
                    this.flatRecords = this.formatFlatRecords(data.results);
                    this.loadRecordMarkers();
                },
                (error: APIError) => console.log('error.msg', error.msg)
            );
    }

    public onBeforeUpload(event: any) {
        this.isUploading = true;
        event.formData.append('create_site', this.uploadCreateSites);
        event.formData.append('delete_previous', this.uploadDeleteExistingRecords);
    }

    public onUploadError(event: any) {
        let statusCode = event.xhr.status;
        let resp = event.xhr.response;
        if (statusCode === 400) {
            this.parseAndDisplayResponse(resp);
        } else {
            this.uploadErrorMessages = [];
            this.uploadErrorMessages.push({
                severity: 'error',
                summary: 'Error',
                detail: statusCode + ':' + resp
            });
        }
        this.isUploading = false;
        this.flatRecords = null;
        if (this.dataset.type !== 'generic') {
            this.markers.clearLayers();
        }
        this.apiService.getRecordsByDatasetId(this.datasetId, this.pageState.rowOffset, this.pageState.rowLimit)
        .subscribe(
            (data: RecordResponse) => {
                this.flatRecords = this.formatFlatRecords(data.results);
                this.loadRecordMarkers();
            },
            (error: APIError) => console.log('error.msg', error.msg)
        );
    }

    public onUploadBeforeSend(event: any) {
        let xhr = event.xhr;

        const authToken = AuthService.getAuthToken();
        if (authToken) {
            xhr.setRequestHeader('Authorization', 'Token ' + authToken);
        }
    }

    public onUploadSelect(event: any) {
        this.uploadErrorMessages = [];
        this.uploadWarningMessages = [];

        // check file type (the last in the list)
        // use the file list of uploader instead of the file list given in the event so we can add/remove to it.
        let files: File[] = this.uploader.files;
        let file: File = files.pop();
        if (ManageDataComponent.ACCEPTED_TYPES.indexOf(file.type) === -1) {
            this.uploadErrorMessages.push({
                severity: 'error',
                summary: 'Wrong file type',
                detail: 'It must be an Excel (.xlsx) or a csv file.'
            });
        } else {
            // put back the file in the list
            files.push(file);
        }
    }

    private formatFlatRecords(records: Record[]) {
        return records.map((r: Record) => Object.assign({
            id: r.id,
            source_info: r.source_info ? r.source_info.file_name + ' row ' + r.source_info.row : 'Manually created',
            created: moment(r.created).format(ManageDataComponent.DATETIME_FORMAT),
            last_modified: moment(r.last_modified).format(ManageDataComponent.DATETIME_FORMAT),
            geometry: r.geometry
        }, r.data));
    }

    private onDeleteRecordsSuccess() {
        this.flatRecords = null;
        if (this.dataset.type !== 'generic') {
            this.markers.clearLayers();
        }
        this.apiService.getRecordsByDatasetId(this.datasetId, this.pageState.rowOffset, this.pageState.rowLimit)
        .subscribe(
            (data: RecordResponse) => {
                this.flatRecords = this.formatFlatRecords(data.results);
                this.loadRecordMarkers();
            },
            (error: APIError) => console.log('error.msg', error.msg)
        );

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

    private parseAndDisplayResponse(resp: any) {
        let items = resp ? JSON.parse(resp) : [];
        let totalRecords = items.length,
            totalErrors = 0,
            totalWarnings = 0;
        this.messages = [];
        this.uploadErrorMessages = [];
        this.uploadWarningMessages = [];
        for (let item of items) {
            if ('errors' in item) {
                for (let errorKey in item['errors']) {
                    totalErrors += 1;
                    this.uploadErrorMessages.push({
                        severity: 'error',
                        summary: 'Error for ' + errorKey + ' in row ' + item['row'],
                        detail: item['errors'][errorKey]
                    });
                }
            }
            if ('warnings' in item) {
                for (let warningKey in item['warnings']) {
                    totalWarnings += 1;
                    this.uploadWarningMessages.push({
                        severity: 'warn',
                        summary: 'Warning for ' + warningKey + ' in row ' + item['row'],
                        detail: item['warnings'][warningKey]
                    });
                }
            }
        }
        if (totalErrors > 0) {
            this.messages.push({
                severity: 'error',
                summary: 'Error uploading records',
                detail: 'There were ' + totalErrors + ' error(s) uploading the records file. See details below.'
            });
        } else if (totalWarnings > 0) {
            this.messages.push({
                severity: 'warn',
                summary: 'Records uploaded with some warnings',
                detail: 'The records were accepted but there were ' + totalWarnings + ' warning(s). See details below.'
            });
        } else {
            console.log('success');
            this.messages.push({
                severity: 'success',
                summary: 'Upload successful',
                detail: '' + totalRecords + ' records were successfully uploaded'
            });
        }
    }
}
