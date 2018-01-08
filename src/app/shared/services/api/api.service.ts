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

    /**
     * Handle HTTP error
     */
    // private handleError(res: any) {
    //     let error: APIError = {
    //         status: res.status,
    //         statusText: res.statusText,
    //         text: res.json(),
    //         msg: ''
    //     };
    //     // The error message is usually in the body as 'detail' or 'non_field_errors'
    //     let body = res.json();
    //     if ('detail' in body) {
    //         error.msg = body['detail'];
    //     } else if ('non_field_errors' in body) {
    //         error.msg = body['non_field_errors'];
    //     } else {
    //         error.msg = body;
    //     }
    //
    //     this._receivedUnauthenticatedError = res.status === 401;
    //
    //     return Observable.throw(error);
    // }

    private handleError (err?: any) {
        // this doesn't seem to be working properly

        let error: APIError = {
            status: err.status,
            statusText: err.statusText,
            text: err.json(),
            msg: ''
        };

        // The error message is usually in the body as 'detail' or 'non_field_errors'
        let body = err.error;
        if ('detail' in body) {
            error.msg = body['detail'];
        } else if ('non_field_errors' in body) {
            error.msg = body['non_field_errors'];
        } else {
            error.msg = body;
        }

        this._receivedUnauthenticatedError = err.status === 401;

        return Observable.throw(error);
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
        });
    }

    public getUser(id: number): Observable<User> {
        return this.request('users/' + id, {});
    }

    public getUsers(): Observable<User[]> {
        return this.request('users', {});
    }

    public whoAmI(): Observable<User> {
        return this.request('whoami', {});
    }

    public getProjects(custodians?: number[]): Observable<Project[]> {
        let params: RequestOptions = {};
        if (custodians) {
            params['urlParams'] = {custodians: custodians.toString()};
        }

        return this.request('projects', params);
    }

    public getProjectById(id: number): Observable<Project> {
        return this.request('projects/' + id, {});
    }

    public createProject(project: Project): Observable<Project> {
        return this.request('projects', {
            method: 'POST',
            data: project
        });
    }

    public updateProject(project: Project): Observable<Project> {
        return this.request('projects/' + project.id, {
            method: 'Patch',
            data: project
        });
    }

    public deleteProject(id: number): Observable<Project> {
        return this.request('projects/' + id, {
            method: 'Delete',
        });
    }

    public getAllSites(): Observable<Site[]> {
        return this.request('sites', {});
    }

    public getAllSitesForProjectID(id: number): Observable<Site[]> {
        return this.request('projects/' + id + '/sites', {});
    }

    public getSiteById(id: number): Observable<Site> {
        return this.request('sites/' + id, {});
    }

    public createSite(site: Site): Observable<Site> {
        return this.request('sites/', {
            method: 'POST',
            data: site
        });
    }

    public updateSite(site: Site): Observable<Site> {
        return this.request('sites/' + site.id, {
            method: 'Patch',
            data: site
        });
    }

    public deleteSite(id: number): Observable<Site> {
        return this.request('sites/' + id, {
            method: 'Delete',
        });
    }

    public deleteSites(projectId: number, siteIds: number[]): Observable<void> {
        return this.request('projects/' + projectId + '/sites/', {
            method: 'Delete',
            data: siteIds
        });
    }

    public getDatasets(params?: any): Observable<Dataset[]> {
        return this.request('datasets', params ? {urlParams: params} : {});
    }

    public getAllDatasetsForProjectID(id: number): Observable<Dataset[]> {
        return this.request('datasets', {urlParams: {project: String(id)}});
    }

    public getDatasetById(id: number): Observable<Dataset> {
        return this.request('datasets/' + id, {});
    }

    public createDataset(dataset: Dataset): Observable<Dataset> {
        return this.request('datasets', {
            method: 'POST',
            data: dataset
        });
    }

    public updateDataset(dataset: Dataset): Observable<Dataset> {
        return this.request('datasets/' + dataset.id, {
            method: 'Patch',
            data: dataset
        });
    }

    public deleteDataset(id: number): Observable<Dataset> {
        return this.request('dataset/' + id, {
            method: 'Delete',
        });
    }

    public getRecordsByDatasetId(id: number): Observable<any[]> {
        return this.request('datasets/' + id + '/records/', {});
    }

    public createRecordsForDatasetId(id: number, data: any[]) {
        return this.request('datasets/' + id + '/records/', {
            method: 'POST',
            data: data
        });
    }

    public getRecords(params?: any): Observable<Record[]> {
        return this.request('records', params ? {urlParams: params} : {});
    }

    public getRecordById(id: number): Observable<Record> {
        return this.request('records/' + id, {});
    }

    public createRecord(record: Record, strict = true): Observable<Record> {
        let urlParams = strict ? {strict: 'true'} : {};
        return this.request('records', {
            method: 'POST',
            data: record,
            urlParams: urlParams
        });
    }

    public updateRecord(id: number, record: Record, strict = true): Observable<Record> {
        let urlParams = strict ? {strict: 'true'} : {};
        return this.request('records/' + id, {
            method: 'Put',
            data: record,
            urlParams: urlParams
        });
    }

    public deleteRecord(id: number): Observable<Record> {
        return this.request('records/' + id, {
            method: 'Delete',
        });
    }

    public deleteRecords(datasetId: number, recordIds: number[]): Observable<void> {
        return this.request('datasets/' + datasetId + '/records/', {
            method: 'Delete',
            data: recordIds
        });
    }

    public deleteAllRecords(datasetId: number): Observable<void> {
        return this.request('datasets/' + datasetId + '/records/', {
            method: 'Delete',
            data: 'all'
        });
    }

    public getStatistics(): Observable<Statistic> {
        return this.request('statistics', {});
    }

    public getModelChoices(modelName: string, fieldName: string): Observable<ModelChoice[]> {
        return this.getModelMetadata(modelName).pipe(
            map((metaData) => metaData.actions['POST'][fieldName]['choices'])
        );
    }

    public getModelMetadata(modelName: string): Observable<any> {
        return this.request(modelName, {
            'method': 'Options'
        });
    }

    public getSpecies(search?: string): Observable<any> {
        let urlParams: any = {};
        if (search) {
            urlParams['search'] = search;
        }
        return this.request('species', {
            urlParams: urlParams
        });
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
        });
    }

    public recordGeometryToData(datasetId: number, geometry: GeoJSON.GeometryObject, data: any) {
        return this.request('utils/geometry-to-data/dataset/' + datasetId, {
            method: 'POST',
            data: {
                geometry: geometry,
                data: data
            }
        });
    }

    public logout(): Observable<any> {
        return this.request('logout', {});
    }

    public request(path: string, options: RequestOptions): Observable<any> {
        const url = this.baseUrl + ((path && !path.endsWith('/')) ? path + '/' : path);

        return this.http.request(options.method || 'GET', url, {
            params: options.urlParams,
            withCredentials: true,
            body: JSON.stringify(options.data)
        })
        .pipe(
            catchError(this.handleError)
        );
    }
}
