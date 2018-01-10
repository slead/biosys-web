import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { RequestOptions, APIError, User, Project, Dataset, Site, Record, Statistic, ModelChoice } from './api.interfaces';
import { environment } from '../../../../environments/environment';

/**
 * This class provides the Biosys API service.
 */
@Injectable()
export class APIService {
    private baseUrl: string;
    private _receivedUnauthenticatedError = false;

    public get receivedUnauthenticatedError() {
        if (this._receivedUnauthenticatedError) {
            this._receivedUnauthenticatedError = false;
            return true;
        }

        return false;
    }

    private handleError (error?: any, caught: Observable<any>) {
        let apiError: APIError = {
            status: error.status,
            statusText: error.statusText,
            msg: error.message
        };

        // The error message is usually in the body as 'detail' or 'non_field_errors'
        let body = error.error;
        if ('detail' in body) {
            apiError.msg = body['detail'];
        } else if ('non_field_errors' in body) {
            apiError.msg = body['non_field_errors'];
        }

        this._receivedUnauthenticatedError = error.status === 401;

        return Observable.throw(apiError);
    }

    /**
     * Creates a new APIService with the injected Http.
     * @param {Http} http - The injected Http.
     * @constructor
     */
    constructor(private http: HttpClient) {
        this.baseUrl = environment.server + environment.apiExtension;
    }

    public getAuthToken(username: string, password: string): Observable<any> {
        return this.request('auth-token', {
            method: 'POST',
            data: {
                username: username,
                password: password
            }
        })
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public getUser(id: number): Observable<User> {
        return this.request('users/' + id, {})
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public getUsers(): Observable<User[]> {
        return this.request('users', {})
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public whoAmI(): Observable<User> {
        return this.request('whoami', {})
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public getProjects(custodians?: number[]): Observable<Project[]> {
        let params: RequestOptions = {};
        if (custodians) {
            params['urlParams'] = {custodians: custodians.toString()};
        }

        return this.request('projects', params)
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public getProjectById(id: number): Observable<Project> {
        return this.request('projects/' + id, {})
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public createProject(project: Project): Observable<Project> {
        return this.request('projects', {
            method: 'POST',
            data: project
        })
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public updateProject(project: Project): Observable<Project> {
        return this.request('projects/' + project.id, {
            method: 'Patch',
            data: project
        })
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public deleteProject(id: number): Observable<Project> {
        return this.request('projects/' + id, {
            method: 'Delete',
        })
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public getAllSites(): Observable<Site[]> {
        return this.request('sites', {})
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public getAllSitesForProjectID(id: number): Observable<Site[]> {
        return this.request('projects/' + id + '/sites', {})
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public getSiteById(id: number): Observable<Site> {
        return this.request('sites/' + id, {})
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public createSite(site: Site): Observable<Site> {
        return this.request('sites/', {
            method: 'POST',
            data: site
        })
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public updateSite(site: Site): Observable<Site> {
        return this.request('sites/' + site.id, {
            method: 'Patch',
            data: site
        })
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public deleteSite(id: number): Observable<Site> {
        return this.request('sites/' + id, {
            method: 'Delete',
        })
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public deleteSites(projectId: number, siteIds: number[]): Observable<void> {
        return this.request('projects/' + projectId + '/sites/', {
            method: 'Delete',
            data: siteIds
        })
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public getDatasets(params?: any): Observable<Dataset[]> {
        return this.request('datasets', params ? {urlParams: params} : {})
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public getAllDatasetsForProjectID(id: number): Observable<Dataset[]> {
        return this.request('datasets', {urlParams: {project: String(id)}})
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public getDatasetById(id: number): Observable<Dataset> {
        return this.request('datasets/' + id, {})
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public createDataset(dataset: Dataset): Observable<Dataset> {
        return this.request('datasets', {
            method: 'POST',
            data: dataset
        })
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public updateDataset(dataset: Dataset): Observable<Dataset> {
        return this.request('datasets/' + dataset.id, {
            method: 'Patch',
            data: dataset
        })
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public deleteDataset(id: number): Observable<Dataset> {
        return this.request('dataset/' + id, {
            method: 'Delete',
        })
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public getRecordsByDatasetId(id: number): Observable<any[]> {
        return this.request('datasets/' + id + '/records/', {});
    }

    public createRecordsForDatasetId(id: number, data: any[]) {
        return this.request('datasets/' + id + '/records/', {
            method: 'POST',
            data: data
        })
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public getRecords(params?: any): Observable<Record[]> {
        return this.request('records', params ? {urlParams: params} : {})
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public getRecordById(id: number): Observable<Record> {
        return this.request('records/' + id, {})
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public createRecord(record: Record, strict = true): Observable<Record> {
        let urlParams = strict ? {strict: 'true'} : {};
        return this.request('records', {
            method: 'POST',
            data: record,
            urlParams: urlParams
        })
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public updateRecord(id: number, record: Record, strict = true): Observable<Record> {
        let urlParams = strict ? {strict: 'true'} : {};
        return this.request('records/' + id, {
            method: 'Put',
            data: record,
            urlParams: urlParams
        })
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public deleteRecord(id: number): Observable<Record> {
        return this.request('records/' + id, {
            method: 'Delete',
        })
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public deleteRecords(datasetId: number, recordIds: number[]): Observable<void> {
        return this.request('datasets/' + datasetId + '/records/', {
            method: 'Delete',
            data: recordIds
        })
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public deleteAllRecords(datasetId: number): Observable<void> {
        return this.request('datasets/' + datasetId + '/records/', {
            method: 'Delete',
            data: 'all'
        })
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public getStatistics(): Observable<Statistic> {
        return this.request('statistics', {})
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public getModelChoices(modelName: string, fieldName: string): Observable<ModelChoice[]> {
        return this.getModelMetadata(modelName).pipe(
            map((metaData) => metaData.actions['POST'][fieldName]['choices'])
        )
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public getModelMetadata(modelName: string): Observable<any> {
        return this.request(modelName, {
            'method': 'Options'
        })
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public getSpecies(search?: string): Observable<any> {
        let urlParams: any = {};
        if (search) {
            urlParams['search'] = search;
        }
        return this.request('species', {
            urlParams: urlParams
        })
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public getRecordsUploadURL(datasetId: number): string {
        return this.baseUrl + 'datasets/' + datasetId + '/upload-records/';
    }

    public getProjectSiteUploadURL(projectId: number): string {
        return this.baseUrl + 'projects/' + projectId + '/upload-sites/';
    }

    public getRecordExportURL(): string {
        return this.baseUrl + 'records/?output=xlsx&';
    }

    public recordDataToGeometry(datasetId: number, geometry: GeoJSON.GeometryObject, data: any) {
        return this.request('utils/data-to-geometry/dataset/' + datasetId, {
            method: 'POST',
            data: {
                geometry: geometry,
                data: data
            }
        })
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public recordGeometryToData(datasetId: number, geometry: GeoJSON.GeometryObject, data: any) {
        return this.request('utils/geometry-to-data/dataset/' + datasetId, {
            method: 'POST',
            data: {
                geometry: geometry,
                data: data
            }
        })
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public logout(): Observable<any> {
        return this.request('logout', {})
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public request(path: string, options: RequestOptions): Observable<any> {
        const url = this.baseUrl + ((path && !path.endsWith('/')) ? path + '/' : path);

        return this.http.request(options.method || 'GET', url, {
            params: options.urlParams,
            withCredentials: true,
            body: JSON.stringify(options.data)
        });
    }
}
