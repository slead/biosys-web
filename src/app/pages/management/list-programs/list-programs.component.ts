import { Component, OnInit } from '@angular/core';
import { APIError, Program, Project, User } from '../../../../biosys-core/interfaces/api.interfaces';
import { APIService } from '../../../../biosys-core/services/api.service';
import { DEFAULT_GROWL_LIFE } from '../../../shared/utils/consts';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, Message, SelectItem } from 'primeng/primeng';
import { AuthService } from '../../../../biosys-core/services/auth.service';
import { formatUserFullName } from '../../../../biosys-core/utils/functions';

@Component({
    moduleId: module.id,
    selector: 'biosys-management-program-list',
    templateUrl: 'list-programs.component.html',
    styleUrls: [],
})

export class ListProgramsComponent implements OnInit {
    public DEFAULT_GROWL_LIFE: number = DEFAULT_GROWL_LIFE;

    public breadcrumbItems: any = [];
    public programs: Program[] = [];
    public messages: Message[] = [];

    private allUsers: { [id: number]: User } = {};

    constructor(private apiService: APIService, private authService: AuthService, private router: Router,
                private route: ActivatedRoute, private confirmationService: ConfirmationService) {
    }

    ngOnInit() {
        const params = this.route.snapshot.params;

        this.apiService.getPrograms().subscribe(
            (programs: Program[]) => this.programs = programs,
            (error: APIError) => console.log('error.msg', error.msg)
        );

        this.apiService.getUsers()
            .subscribe(
                (users: User[]) => users.forEach((user: User) => this.allUsers[user.id] = user),
                (error: APIError) => console.log('error.msg', error.msg)
            );

        this.breadcrumbItems = [
            {label: 'Manage - Programs'}
        ];

        if ('programSaved' in params) {
            this.messages.push({
                severity: 'success',
                summary: 'Program saved',
                detail: 'The program was saved'
            });
        } else if ('programDeleted' in params) {
            this.messages.push({
                severity: 'success',
                summary: 'Program deleted',
                detail: 'The program was deleted'
            });
        }
    }
    public formatDataEngineers(userIds: number[]): string {
        if (this.allUsers) {
            return userIds
                .map(id => formatUserFullName(this.allUsers[id] || ''))
                .join('; ')
                .trim();
        } else {
            return '';
        }
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
        this.apiService.getPrograms().subscribe(
            (programs: Program[]) => this.programs = programs,
            (error: APIError) => console.log('error.msg', error.msg)
        );

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
