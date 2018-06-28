import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { ConfirmationService, Message, SelectItem } from 'primeng/primeng';
import { map } from 'rxjs/operators';

import { APIError, User, Project, Site, Dataset, ModelChoice } from '../../../../biosys-core/interfaces/api.interfaces';
import { APIService } from '../../../../biosys-core/services/api.service';
import { DATASET_TYPE_MAP } from '../../../../biosys-core/utils/consts';
import { DEFAULT_GROWL_LIFE } from '../../../shared/utils/consts';

import { environment } from '../../../../environments/environment';

import { FeatureMapComponent } from '../../../shared/featuremap/featuremap.component';

@Component({
    moduleId: module.id,
    selector: 'biosys-edit-program',
    templateUrl: 'edit-program.component.html',
})

export class EditProgramComponent implements OnInit {
    public static DEFAULT_TIMEZONE: string = 'Australia/Perth';

    private static COLUMN_WIDTH: number = 240;
    private static FIXED_COLUMNS_TOTAL_WIDTH = 700;

    @ViewChild(FeatureMapComponent)
    public featureMapComponent: FeatureMapComponent;

    public DATASET_TYPE_MAP: any = DATASET_TYPE_MAP;
    public DEFAULT_GROWL_LIFE: number = DEFAULT_GROWL_LIFE;
    public TEMPLATE_LATLNG_URL: string = environment.server + '/download/templates/site/lat-long';
    public TEMPLATE_EASTNORTH_URL: string = environment.server + '/download/templates/site/easting-northing';
    public selectedSites: Site[] = [];
    public flatSites: any[];
    public siteAttributeKeys: string[] = [];
    public breadcrumbItems: any = [];
    public project: Project = <Project> {
        timezone: EditProgramComponent.DEFAULT_TIMEZONE,
        custodians: []
    };
    public datasets: Dataset[];
    public isEditing: boolean;
    public datamTypeChoices: SelectItem[];
    public custodianChoices: SelectItem[];
    public projectErrors: any = {};
    public messages: Message[] = [];

    constructor(private apiService: APIService, private router: Router, private route: ActivatedRoute,
        private confirmationService: ConfirmationService, private sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        let params = this.route.snapshot.params;

        this.isEditing = !('id' in params);

        if (!this.isEditing) {
            this.apiService.getProjectById(Number(params['id'])).subscribe(
                (project: Project) => {
                    this.project = project;
                    this.breadcrumbItems.push({label: this.project.name});
                },
                (error: APIError) => console.log('error.msg', error.msg)
            );
        }

        this.apiService.getModelChoices('project', 'datum')
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
                (choices: SelectItem[]) => this.datamTypeChoices = choices,
                (error: APIError) => console.log('error.msg', error.msg)
            );

        this.apiService.getUsers()
            .pipe(
                map(
                    (users: User[]): SelectItem[] =>
                        users.map((user: User): SelectItem => {
                            return {
                                label: `${user.first_name} ${user.last_name}`.trim() || `${user.username}`.trim(),
                                value: user.id
                            };
                        })
                )
            )
            .subscribe(
                (users: SelectItem[]) => this.custodianChoices = users,
                (error: APIError) => console.log('error.msg', error.msg)
            );

        this.breadcrumbItems = [
            {label: 'Manage - Projects', routerLink: ['/management/projects']},
        ];

        if (this.isEditing) {
            this.breadcrumbItems.push({label: 'Create Project'});

            // add self to selected custodians if creating project
            this.apiService.whoAmI().subscribe(
                (user: User) => this.project.custodians.push(user.id),
                (error: APIError) => console.log('error.msg', error.msg)
            );
        }

        if ('siteSaved' in params) {
            this.messages.push({
                severity: 'success',
                summary: 'Site saved',
                detail: 'The site was saved'
            });
        } else if ('datasetSaved' in params) {
            this.messages.push({
                severity: 'success',
                summary: 'Dataset saved',
                detail: 'The dataset was saved'
            });
        } else if ('siteDeleted' in params) {
            this.messages.push({
                severity: 'success',
                summary: 'Site deleted',
                detail: 'The site was deleted'
            });
        } else if ('datasetDeleted' in params) {
            this.messages.push({
                severity: 'success',
                summary: 'Dataset deleted',
                detail: 'The dataset was deleted'
            });
        }

        // for some reason the growls won't disappear if messages populated during init, so need
        // to set a timeout to remove
        setTimeout(() => {
            this.messages = [];
        }, DEFAULT_GROWL_LIFE);
    }

    public getDatumLabel(value: string): string {
        if (!this.datamTypeChoices) {
            return '';
        }

        return this.datamTypeChoices.filter(d => d.value === value).pop().label;
    }

    public getSelectedCustodiansLabel(custodians: number[]): string {
        if (!this.custodianChoices || !custodians || !custodians.length) {
            return '';
        }

        return this.custodianChoices.filter(c =>
            custodians.indexOf(c.value) > -1).map(c => c.label).reduce((a, b) => a + '; ' + b);
    }

    public saveProject() {
        this.project.geometry = this.featureMapComponent.getFeatureGeometry();

        if (this.project.id) {
            this.apiService.updateProject(this.project).subscribe(
                (project: Project) => {
                    this.project = project;
                    this.projectErrors = {};
                    this.isEditing = false;
                },
                (errors: APIError) => this.projectErrors = errors.msg,
            );
        } else {
            this.apiService.createProject(this.project).subscribe(
                (project: Project) => {
                    this.project = project;
                    this.breadcrumbItems.pop();
                    this.breadcrumbItems.push({label: 'Edit ' + this.project.name});
                    this.projectErrors = {};
                    this.isEditing = false;
                    // The next two lines are for stopping the spinner on datasets and sites tables
                    this.datasets = [];
                    this.flatSites = [];
                },
                (errors: APIError) => this.projectErrors = errors.msg
            );
        }
    }

    public editProject() {
        this.isEditing = true;
    }
}
