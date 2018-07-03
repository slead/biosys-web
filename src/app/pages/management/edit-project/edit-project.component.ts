import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { ConfirmationService, Message, SelectItem } from 'primeng/primeng';

import { APIError, User, Project, Site, Dataset, ModelChoice, Program }
    from '../../../../biosys-core/interfaces/api.interfaces';
import { APIService } from '../../../../biosys-core/services/api.service';
import { DEFAULT_GROWL_LIFE } from '../../../shared/utils/consts';

import { environment } from '../../../../environments/environment';

import { FeatureMapComponent } from '../../../shared/featuremap/featuremap.component';
import { formatUserFullName } from '../../../../biosys-core/utils/functions';

@Component({
    moduleId: module.id,
    selector: 'biosys-edit-project',
    templateUrl: 'edit-project.component.html',
})

export class EditProjectComponent implements OnInit {
    public static DEFAULT_TIMEZONE: string = 'Australia/Perth';

    private static COLUMN_WIDTH: number = 240;
    private static FIXED_COLUMNS_TOTAL_WIDTH = 700;

    @ViewChild(FeatureMapComponent)
    public featureMapComponent: FeatureMapComponent;

    public DEFAULT_GROWL_LIFE: number = DEFAULT_GROWL_LIFE;
    public TEMPLATE_LATLNG_URL: string = environment.server + '/download/templates/site/lat-long';
    public TEMPLATE_EASTNORTH_URL: string = environment.server + '/download/templates/site/easting-northing';
    public selectedSites: Site[] = [];
    public flatSites: any[];
    public siteAttributeKeys: string[] = [];
    public breadcrumbItems: any = [];
    public project: Project = <Project> {
        timezone: EditProjectComponent.DEFAULT_TIMEZONE,
        custodians: []
    };
    public datasets: Dataset[];
    public isEditing: boolean;
    public programChoices: SelectItem[];
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
            this.apiService.getProjectById(+params['id']).subscribe(
                (project: Project) => {
                    this.project = project;
                    this.breadcrumbItems.push({label: this.project.name});
                },
                (error: APIError) => console.log('error.msg', error.msg)
            );

            this.apiService.getAllDatasetsForProjectID(+params['id']).subscribe(
                (datasets: Dataset[]) => this.datasets = datasets,
                (error: APIError) => console.log('error.msg', error.msg)
            );

            this.apiService.getAllSitesForProjectID(+params['id']).subscribe(
                (sites: Site[]) => {
                    this.flatSites = this.formatFlatSites(sites);
                    this.siteAttributeKeys = sites.length > 0 ? this.extractSiteAttributeKeys(sites[0]) : [];
                },
                (error: APIError) => console.log('error.msg', error.msg)
            );
        }

        this.apiService.getPrograms()
            .subscribe(
                (programs: Program[]) => this.programChoices = programs.map((program: Program) => ({
                        label: program.name,
                        value: program.id
                    })
                ),
                (error: APIError) => console.log('error.msg', error.msg)
            );

        this.apiService.getModelChoices('project', 'datum')
            .subscribe(
                (choices: ModelChoice[]) => this.datamTypeChoices = choices.
                    map((choice: ModelChoice) => ({
                            label: choice.display_name,
                            value: choice.value
                    })
                ),
                (error: APIError) => console.log('error.msg', error.msg)
            );

        this.apiService.getUsers()
            .subscribe(
                (users: User[]) => this.custodianChoices = users.map((user: User) => ({
                        label: formatUserFullName(user),
                        value: user.id
                    })
                ),
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

    public getProgramLabel(value: any): string {
        if (!this.programChoices) {
            return '';
        }

        return this.programChoices.filter(d => d.value === value).pop().label;
    }

    public getDatumLabel(value: string): string {
        if (!this.datamTypeChoices) {
            return '';
        }

        return this.datamTypeChoices.filter(choice => choice.value === value).pop().label;
    }

    public getSiteTableWidth(): any {
        if (!this.siteAttributeKeys.length) {
            return this.sanitizer.bypassSecurityTrustStyle('100%');
        }

        const width = EditProjectComponent.FIXED_COLUMNS_TOTAL_WIDTH +
            this.siteAttributeKeys.length * EditProjectComponent.COLUMN_WIDTH;

        return this.sanitizer.bypassSecurityTrustStyle(`${width}px`);
    }

    public formatSitePopup(site: Site): string {
        let popupContent: string = '<p class="m-0"><strong>' + (site.name ? site.name : site.code) + '</strong></p>';
        if (site.description) {
            popupContent += '<p class="mt-1">' + site.description + '</p>';
        }

        let projId = this.project.id ? this.project.id : Number(this.route.snapshot.params['id']);

        if (projId) {
            popupContent += '<p class="mt-1"><a href="#/management/projects/edit-project/' + projId + '/edit-site/' +
                site.id + '">Edit Site</a></p>';
        }

        return popupContent;
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

    public cancelEditProject() {
        this.apiService.getProjectById(this.project.id).subscribe(
            (project: Project) => this.project = project,
            (error: APIError) => console.log('error.msg', error.msg)
        );

        this.isEditing = false;
    }

    public confirmDeleteDataset(dataset: Dataset) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this dataset?',
            accept: () => {
                this.apiService.deleteDataset(dataset.id)
                    .subscribe(
                        () => this.onDeleteDatasetSuccess(dataset),
                        (error: APIError) => this.onDeleteDatasetError(error)
                    );
            }
        });
    }

    public confirmDeleteSelectedSites() {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete all selected sites?',
            accept: () => {
                this.apiService.deleteSites(this.project.id, this.selectedSites.map((site: Site) => site.id))
                .subscribe(
                    () => this.onDeleteSitesSuccess(),
                    (error: APIError) => this.onDeleteSiteError(error)
                );
            }
        });
    }

    private onDeleteDatasetSuccess(dataset: Dataset) {
        this.datasets = null;
        this.apiService.getAllDatasetsForProjectID(this.project.id).subscribe(
            (datasets: Dataset[]) => this.datasets = datasets,
            (error: APIError) => console.log('error.msg', error.msg)
        );

        this.messages.push({
            severity: 'success',
            summary: 'Dataset deleted',
            detail: 'The dataset was deleted'
        });
    }

    private onDeleteDatasetError(error: APIError) {
        this.messages.push({
            severity: 'error',
            summary: 'Dataset delete error',
            detail: 'There were error(s) deleting the dataset: ' + error.msg
        });
    }

    private extractSiteAttributeKeys(site: Site): string[] {
        // For now just use attributes for first site in array as all sites *should* have the same
        // attributes. In future use site schema associated with project.
        return site ? Object.keys(site.attributes) : [];
    }

    private formatFlatSites(sites: Site[]): any[] {
        return sites.map((s: Site) => Object.assign({
            id: s.id,
            code: s.code,
            name: s.name,
            description: s.description,
            centroid: s.centroid
        }, s.attributes));
    }

    private onDeleteSitesSuccess() {
        this.flatSites = null;
        this.apiService.getAllSitesForProjectID(this.project.id).subscribe(
            (sites: Site[]) => {
                this.flatSites = this.formatFlatSites(sites);
                this.siteAttributeKeys = sites.length > 0 ? this.extractSiteAttributeKeys(sites[0]) : [];
            },
            (error: APIError) => console.log('error.msg', error.msg)
        );

        this.messages.push({
            severity: 'success',
            summary: 'Site(s) deleted',
            detail: 'The site(s) was deleted'
        });
    }

    private onDeleteSiteError(error: APIError) {
        this.messages.push({
            severity: 'error',
            summary: 'Site delete error',
            detail: 'There were error(s) deleting the site(s): ' + error.msg
        });
    }
}
