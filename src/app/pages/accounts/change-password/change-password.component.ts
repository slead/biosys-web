import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { APIService } from '../../../../biosys-core/services/api.service';
import { fieldMatchValidator } from '../../../shared/utils/form-validators';
import { MessageService } from 'primeng/api';
import { APIError } from '../../../../biosys-core/interfaces/api.interfaces';
import { formatAPIError } from '../../../../biosys-core/utils/functions';

@Component({
  selector: 'biosys-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
    public changePasswordForm: FormGroup;
    public oldPasswordError: string;
    public breadcrumbItems = [
        {label: 'Change Password'}
    ];

    constructor(private formBuilder: FormBuilder, private apiService: APIService,
                private messageService: MessageService, private router: Router) {
        this.changePasswordForm = formBuilder.group({
            oldPassword: ['', Validators.required],
            newPassword: ['', Validators.required],
            newPasswordConfirm: ['', Validators.required]
        }, {
            validator: fieldMatchValidator('newPassword', 'newPasswordConfirm')
        });
    }

    public resetPassword() {
        event.preventDefault();

        const oldPassword = this.changePasswordForm.value['oldPassword'];
        const newPassword = this.changePasswordForm.value['newPassword'];

        this.oldPasswordError = null;

        this.apiService.changePassword(oldPassword, newPassword).subscribe(
            () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Password changed',
                    detail: 'Your password was successfully changed'
                });
                this.router.navigate(['/']);
            },
            (apiError: APIError) => {
                const errors = formatAPIError(apiError);
                if (errors.hasOwnProperty('current_password')) {
                    this.oldPasswordError = errors['current_password'];
                }
            }
        );
    }
}
