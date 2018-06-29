import { Component, OnInit } from '@angular/core';
import { APIError, Program, Project, User } from '../../../../biosys-core/interfaces/api.interfaces';
import { APIService } from '../../../../biosys-core/services/api.service';
import { DEFAULT_GROWL_LIFE } from '../../../shared/utils/consts';
import { Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/primeng';

@Component({
    moduleId: module.id,
    selector: 'biosys-management-program-list',
    templateUrl: 'list-programs.component.html',
    styleUrls: [],
})

export class ListProgramsComponent implements OnInit {
    public DEFAULT_GROWL_LIFE: number = DEFAULT_GROWL_LIFE;

    public breadcrumbItems: any = [];
    public programs: Project[] = [];
    public messages: Message[] = [];

    private user: User;

    constructor(private apiService: APIService, private router: Router,
                private confirmationService: ConfirmationService) {
    }

    ngOnInit() {
        this.apiService.whoAmI()
            .toPromise()
            .then((user: User) => this.user = user,
                (error: APIError) => console.log('error.msg', error.msg)
            )
            .then(() => {
                if (this.user.is_superuser) {
                    this.apiService.getPrograms().subscribe(
                        (programs: Program[]) => this.programs = programs,
                        (error: APIError) => console.log('error.msg', error.msg)
                    );
                } else {
                    this.apiService.getPrograms([this.user.id]).subscribe(
                        (programs: Program[]) => this.programs = programs,
                        (error: APIError) => console.log('error.msg', error.msg)
                    );
                }
            }, (error: APIError) => console.log('error.msg', error.msg));

        this.breadcrumbItems = [
            {label: 'Manage - Programs'}
        ];
    }

    public formatDataEnginners(users: User[]): string {
        return users.reduce((acc, cur) => acc + '; ' + cur.username, '');
    }

    public confirmDelete(program: Program) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this program?',
            accept: () => {
                this.apiService.deleteProgram(program.id)
                    .subscribe(
                        () => this.onDeleteSuccess(program),
                        (error: APIError) => this.onDeleteError(error)
                    );
            }
        });
    }

    private onDeleteSuccess(program: Program) {
        if (this.user.is_superuser) {
            this.apiService.getPrograms().subscribe(
                (programs: Program[]) => this.programs = programs,
                (error: APIError) => console.log('error.msg', error.msg)
            );
        } else {
            this.apiService.getPrograms([this.user.id]).subscribe(
                (programs: Program[]) => this.programs = programs,
                (error: APIError) => console.log('error.msg', error.msg)
            );
        }

        this.messages.push({
            severity: 'success',
            summary: 'Program deleted',
            detail: 'The program was deleted'
        });
    }

    private onDeleteError(programError: any) {
        this.messages.push({
            severity: 'error',
            summary: 'Program delete error',
            detail: 'There were error(s) deleting the program: ' + programError.msg
        });
    }
}
