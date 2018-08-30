import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';

import {
    APIError, Dataset, DatasetMedia, Media, ModelChoice, Project,
} from '../../../../biosys-core/interfaces/api.interfaces';
import { APIService } from '../../../../biosys-core/services/api.service';
import { formatAPIError } from '../../../../biosys-core/utils/functions';

import { AuthService } from '../../../../biosys-core/services/auth.service';

import { DEFAULT_GROWL_LIFE } from '../../../shared/utils/consts';

import { ConfirmationService, FileUpload, Message, MessageService, SelectItem } from 'primeng/primeng';

import { JsonEditorComponent } from '../../../shared/jsoneditor/jsoneditor.component';
import { JsonEditorOptions } from '../../../shared/jsoneditor/jsoneditor.options';
import { from } from 'rxjs/index';

@Component({
    moduleId: module.id,
    selector: 'biosys-edit-dataset',
    templateUrl: 'edit-dataset.component.html',
    styleUrls: ['edit-dataset.component.css'],
})

export class EditDatasetComponent implements OnInit {
    @Input()
    public isValid = true;

    @ViewChild(JsonEditorComponent)
    public editor: JsonEditorComponent;

    @ViewChild(FileUpload)
    public fileUpload: FileUpload;

    public breadcrumbItems: any = [];
    public typeChoices: SelectItem[];
    public ds: Dataset = <Dataset>{};
    public editorOptions: JsonEditorOptions;
    public dsErrors: any = {};
    public displayHelp = false;
    public datasetMedia: DatasetMedia[] = [];
    public isUploadingMedia = false;

    private completeUrl: string;

    constructor(public apiService: APIService, private authService: AuthService, private router: Router,
                private route: ActivatedRoute, private messageService: MessageService,
                private confirmationService: ConfirmationService) {
        this.editorOptions = new JsonEditorOptions();
        this.editorOptions.mode = 'code';
        this.editorOptions.modes = ['code', 'form', 'text', 'tree', 'view'];
        this.editorOptions.onChange = this.onEditorChanged.bind(this);
    }

    ngOnInit() {
        const params = this.route.snapshot.params;

        const projId: number = Number(params['projId']);

        this.apiService.getProjectById(projId)
            .subscribe(
                (project: Project) => this.breadcrumbItems.splice(1, 0, {
                    label: project.name,
                    routerLink: ['/management/projects/edit-project/' + projId]
                }),
                (error: APIError) => console.log('error.msg', error.msg)
            );

        if ('id' in params) {
            const datasetId: number = Number(params['id']);

            this.apiService.getDatasetById(datasetId).subscribe(
                (ds: Dataset) => {
                    this.ds = ds;
                    this.editor.set(<JSON>this.ds.data_package);
                    this.breadcrumbItems.push({label: this.ds.name});
                },
                (error: APIError) => console.log('error.msg', error.msg)
            );
        } else {
            this.ds.project = Number(params['projId']);
        }

        this.apiService.getModelChoices('dataset', 'type')
            .pipe(
                map(
                    (choices: ModelChoice[]): SelectItem[] =>
                        choices.map((choice: ModelChoice): SelectItem => {
                            return {
                                label: choice.display_name,
                                value: choice.value
                            };
                        })
                )
            )
            .subscribe(
                (choices: SelectItem[]) => this.typeChoices = choices,
                (error: APIError) => console.log('error.msg', error.msg)
            );

        this.breadcrumbItems = [
            {label: 'Manage - Projects', routerLink: ['/management/projects']},
        ];

        if (!('id' in params)) {
            this.breadcrumbItems.push({label: 'Create Dataset '});
        }

        this.completeUrl = '/management/projects/edit-project/' + projId;
    }

    public onUpload(event: any) {
        const response: any = JSON.parse(event.xhr.response);
        this.ds.name = response.name;
        this.ds.type = response.type;
        this.ds.data_package = response.data_package;

        this.editor.set(<JSON>this.ds.data_package);
    }

    public onUploadBeforeSend(event: any) {
        const xhr = event.xhr;

        const authToken = this.authService.getAuthToken();
        if (authToken) {
            xhr.setRequestHeader('Authorization', 'Token ' + authToken);
        }
    }

    public onError(event: any) {
        const response = JSON.parse(event.xhr.response);

        if ('errors' in response) {
            for (const error of response.errors) {
                this.fileUpload.msgs.push({
                    severity: 'error',
                    summary: error
                });
            }
        }
    }

    public save() {
        if (this.ds.id) {
            this.apiService.updateDataset(this.ds).subscribe(
                () => {
                    this.router.navigate([this.completeUrl]);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Dataset saved',
                        detail: 'The dataset was saved'
                    });
                },
                (error: APIError) => this.dsErrors = error.msg
            );
        } else {
            this.apiService.createDataset(this.ds).subscribe(
                () => {
                    this.router.navigate([this.completeUrl]);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Dataset created',
                        detail: 'The dataset was created'
                    });
                },
                (error: APIError) => this.onSaveError(error)
            );
        }
    }

    public cancel() {
        this.router.navigate([this.completeUrl]);
    }

    public confirmDelete(event: any) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this dataset?',
            accept: () => this.apiService.deleteDataset(this.ds.id).subscribe(
                (ds: Dataset) => this.onDeleteSuccess(),
                (error: APIError) => this.onDeleteError(error))
        });
    }

    private onDeleteSuccess() {
        this.router.navigate([this.completeUrl, {'datasetDeleted': true}]);
    }

    public confirmDeleteRecords(event: any) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete all records for this dataset?',
            accept: () => this.apiService.deleteAllRecords(this.ds.id).subscribe(
                () => this.onDeleteRecordsSuccess(),
                (error: APIError) => this.onDeleteError(error))
        });
    }

    private onDeleteRecordsSuccess() {
        this.messageService.add({
            severity: 'success',
            summary: 'Records Deleted',
            detail: 'All records for this dataset have been deleted.'
        });
    }

    private onEditorChanged() {
        try {
            this.ds.data_package = this.editor.get();
            this.isValid = true;
        } catch (e) {
            this.isValid = false;
        }
    }

    private onSaveError(error: APIError) {
        this.dsErrors = formatAPIError(error);
    }

    private onDeleteError(error: APIError) {
        this.dsErrors = formatAPIError(error);
        this.messageService.add({
            severity: 'error',
            summary: 'Dataset delete error',
            detail: 'There were error(s) deleting the dataset'
        });
    }

    public onUploadMedia(files: File[]) {
        this.isUploadingMedia = true;
        from(files).pipe(
            mergeMap((file: any) => this.apiService.uploadDatasetMediaBinary(this.ds.id, file))
        ).subscribe(
            (dm: DatasetMedia) => {
                this.datasetMedia.push(dm);
                this.messageService.add({
                    severity: 'success',
                    summary: 'File Attachment Uploaded',
                    detail: `The file ${dm.file.substring(dm.file.lastIndexOf('/') + 1)} was uploaded`
                });
            },
            (error: APIError) => {
                this.isUploadingMedia = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error Uploading File Attachment',
                    detail: error.msg as string
                });
            },
            () => this.isUploadingMedia = false
        );
    }

    public onDeleteMedia(media: Media) {
        this.confirmationService.confirm({
            message: `Are you sure that you want to delete the file ${media.file.substring(media.file.lastIndexOf('/') + 1)}`,
            accept: () => {
                this.apiService.deleteDatasetMedia(this.ds.id, media.id).subscribe(
                    () => {
                        this.datasetMedia.splice(this.datasetMedia.map(
                        (dm: DatasetMedia) => dm.id
                        ).indexOf(media.id),
                        1
                        );
                        this.messageService.add({
                            severity: 'success',
                            summary: 'File Attachment Deleted',
                            detail: `The file ${media.file.substring(media.file.lastIndexOf('/') + 1)} was deleted`
                        });
                    },
                    (error: APIError) => this.messageService.add({
                        severity: 'error',
                        summary: 'Error Deleting File Attachment',
                        detail: error.msg as string
                    })
                );
            }
        });
    }
}
