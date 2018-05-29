import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Message, ConfirmationService } from 'primeng/primeng';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import '../../../../lib/leaflet.latlng-graticule'

import { APIService } from '../../../../biosys-core/services/api.service';
import { AuthService } from '../../../../biosys-core/services/auth.service';
import { APIError, Project, Dataset, Record } from '../../../../biosys-core/interfaces/api.interfaces';
import { DEFAULT_GROWL_LIFE } from '../../../shared/utils/consts';

import { FileuploaderComponent } from '../../../shared/fileuploader/fileuploader.component';
import {
    DEFAULT_CENTER, DEFAULT_MARKER_ICON, DEFAULT_ROW_LIMIT, DEFAULT_ZOOM, getDefaultBaseLayer,
    getOverlayLayers
} from '../../../shared/utils/maputils';
import { EditRecordsTableComponent } from '../../../shared/edit-records-table/edit-records-table.component';

@Component({
    moduleId: module.id,
    selector: 'biosys-data-dataset-list',
    templateUrl: 'manage-data.component.html',
    styleUrls: ['manage-data.component.css'],
})
export class ManageDataComponent implements OnInit, OnDestroy {
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

    @ViewChild(EditRecordsTableComponent)
    public editRecordsTableComponent: EditRecordsTableComponent;

    @ViewChild(FileuploaderComponent)
    public uploader: FileuploaderComponent;

    public breadcrumbItems: any = [];
    public projId: number;
    public datasetId: number;
    public dataset: Dataset;
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
        rowLimit: DEFAULT_ROW_LIMIT
    };

    private map: L.Map;
    private markers: L.MarkerClusterGroup;
    private markersByRecordId: object;

    constructor(private apiService: APIService, private  authService: AuthService, private router: Router,
                private route: ActivatedRoute, private confirmationService: ConfirmationService) {
    }

    public ngOnInit() {
        let params = this.route.snapshot.params;

        this.projId = Number(params['projId']);
        this.datasetId = Number(params['datasetId']);

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
        ).then(() => this.loadRecordMarkers());

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

    private recordToLatLng(record: Record): L.LatLng {
        let result;
        if (record.geometry) {
            let coord: GeoJSON.Position = record.geometry.coordinates as GeoJSON.Position;
            result = L.GeoJSON.coordsToLatLng([coord[0], coord[1]]);
        }
        return result;
    }

    private loadRecordMarkers() {
        if (this.dataset.type === 'generic') {
            return;
        }

        this.apiService.getRecordsByDatasetId(this.datasetId, {fields: ['id', 'geometry']})
        .subscribe(
            (records: Record[]) => {
                this.markers.clearLayers();
                this.markersByRecordId = {};

                for (let record of records) {
                    if (record.geometry) {
                        let marker: L.Marker = L.marker(this.recordToLatLng(record),
                            {icon: DEFAULT_MARKER_ICON});
                        let popupContent: string = '<p class="m-0">Record ID: <strong>' + record.id + '</strong></p>' +
                            '<p class="mt-1"><a href="#/data/projects/' + this.projId + '/datasets/' + this.datasetId +
                            '/record/' + record.id + '">Edit Record</a></p>';

                        marker.bindPopup(popupContent);
                        marker.on('mouseover', function () {
                            this.openPopup();
                        });
                        this.markers.addLayer(marker);
                        this.markersByRecordId[record.id] = marker;
                    }
                }
            },
            (error: APIError) => console.log('error.msg', error.msg)
        );
    }

    public onRecordChanged(record: Record) {
        let marker = this.markersByRecordId[record.id];
        marker.setLatLng(this.recordToLatLng(record));
        this.markers.refreshClusters([marker]);
    }

    public onRecordsDeleted() {
        this.loadRecordMarkers();
    }

    public onUpload(event: any) {
        this.parseAndDisplayResponse(event.xhr.response);
        this.isUploading = false;

        this.editRecordsTableComponent.reloadRecords();

        this.loadRecordMarkers();
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

        this.editRecordsTableComponent.reloadRecords();

        this.loadRecordMarkers();
    }

    public onUploadBeforeSend(event: any) {
        let xhr = event.xhr;

        const authToken = this.authService.getAuthToken();
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
            this.messages.push({
                severity: 'success',
                summary: 'Upload successful',
                detail: '' + totalRecords + ' records were successfully uploaded'
            });
        }
    }

    private showUpdateError(error: APIError) {
        this.messages = [];
        error.msg.data.forEach((err: string) => {
            let field, message;
            [field, message] = err.split('::');
            this.messages.push({
                severity: 'error',
                summary: 'Error on ' + field,
                detail: message
            });
        });
    }
}
