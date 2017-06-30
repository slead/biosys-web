import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { APIService, APIError, Project, Dataset, JsonEditorComponent, JsonEditorOptions, DEFAULT_GROWL_LIFE }
    from '../../../shared/index';
import { Router, ActivatedRoute } from '@angular/router';

import { ConfirmationService, SelectItem, Message } from 'primeng/primeng';
import { ModelChoice } from '../../../shared/services/api/api.interfaces';

@Component({
    moduleId: module.id,
    selector: 'biosys-edit-dataset',
    templateUrl: 'edit-dataset.component.html',
    styleUrls: [],
})

export class EditDatasetComponent implements OnInit {
    @Input()
    public isValid: boolean = true;

    @ViewChild(JsonEditorComponent)
    public editor: JsonEditorComponent;

    public DEFAULT_GROWL_LIFE: number = DEFAULT_GROWL_LIFE;

    public breadcrumbItems: any = [];
    public typeChoices: SelectItem[];
    public messages: Message[] = [];
    public ds: Dataset = <Dataset>{};
    public editorOptions: JsonEditorOptions;

    public dsErrors: any = {};

    private completeUrl: string;

    constructor(private apiService: APIService,
                private router: Router,
                private route: ActivatedRoute,
                private confirmationService: ConfirmationService) {
        this.editorOptions = new JsonEditorOptions();
        this.editorOptions.mode = 'code';
        this.editorOptions.modes = ['code', 'form', 'text', 'tree', 'view'];
        this.editorOptions.onChange = this.onEditorChanged.bind(this);
    }

    ngOnInit() {
        let params = this.route.snapshot.params;

        let projId: number = Number(params['projId']);

        this.apiService.getProjectById(projId)
            .subscribe(
                (project: Project) => this.breadcrumbItems.splice(1, 0, {
                    label: project.name,
                    routerLink: ['/management/projects/edit-project/' + projId]
                }),
                (error: APIError) => console.log('error.msg', error.msg)
            );

        if ('id' in params) {
            let datasetId: number = Number(params['id']);

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
            .map(
                (choices: ModelChoice[]): SelectItem[] =>
                    choices.map((choice: ModelChoice): SelectItem => {
                        return {
                            label: choice.display_name,
                            value: choice.value
                        };
                    })
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

    public save() {
        if (this.ds.id) {
            this.apiService.updateDataset(this.ds).subscribe(
                () => this.router.navigate([this.completeUrl, {'datasetSaved': true}]),
                (errors: APIError) => this.dsErrors = errors.text
            );
        } else {
            this.apiService.createDataset(this.ds).subscribe(
                () => this.router.navigate([this.completeUrl, {'datasetSaved': true}]),
                (errors: APIError) => this.dsErrors = errors.text
            );
        }
    }

    public cancel() {
        this.router.navigate([this.completeUrl]);
    }

    public confirmDelete(event: any) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this dataset?',
            accept: () =>  this.apiService.deleteDataset(this.ds.id).subscribe(
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
            accept: () =>  this.apiService.deleteAllRecords(this.ds.id).subscribe(
                () => this.onDeleteRecordsSuccess(),
                (error: APIError) => this.onDeleteError(error))
        });
    }

    private onDeleteRecordsSuccess() {
        this.messages.push({
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

    private showError(error: APIError) {
        let addErrorMessage = (detail: any) => {
            this.messages.push({
                severity: 'error',
                summary: 'Error',
                detail: detail.toString()
            });
        };
        if (typeof error.msg === 'object') {
            for (let field in error.msg) {
                if (error.msg.hasOwnProperty(field)) {
                    addErrorMessage(field + ': ' + error.msg[field].join(';'));
                }
            }
        } else {
            addErrorMessage(error.msg);
        }
    }

    private onDeleteError(error: any) {
        this.messages.push({
            severity: 'error',
            summary: 'Dataset delete error',
            detail: 'There were error(s) deleting the dataset'
        });
    }
}
