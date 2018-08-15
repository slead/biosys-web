import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../../../biosys-core/services/auth.service';
import { map, mergeMap } from 'rxjs/operators';
import { Program, Project, User } from '../../../biosys-core/interfaces/api.interfaces';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Observable } from 'rxjs/Observable';
import { APIService } from '../../../biosys-core/services/api.service';


@Injectable()
export class DataEngineerGuard implements CanActivate {
    constructor(private authService: AuthService, private apiService: APIService) {
    }

    canActivate(route: ActivatedRouteSnapshot) {
        if (!route.params.hasOwnProperty('projId')) {
            return this.authService.getCurrentUser().pipe(
                map((user: User) => user.is_admin || user.is_data_engineer)
            )
        }

        const projId = +route.params['projId'];

        const programObservable: Observable<Program> = this.apiService.getProjectById(projId).pipe(
            mergeMap((project: Project) => this.apiService.getProgramById(project.program))
        );

        return forkJoin(programObservable, this.authService.getCurrentUser()).pipe(
            map((result: [Program, User]) => {
                const program: Program = result[0];
                const user: User = result[1];

                if (user.is_admin) {
                    return true;
                } else {
                    return user.is_data_engineer && program.data_engineers.indexOf(user.id) > -1;
                }
            })
        );
    }
}
