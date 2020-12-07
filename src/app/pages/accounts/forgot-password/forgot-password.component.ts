import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APIService } from '../../../../biosys-core/services/api.service';
import { APIError } from '../../../../biosys-core/interfaces/api.interfaces';
import { formatAPIError } from '../../../../biosys-core/utils/functions';

@Component({
    selector: 'biosys-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
    public forgotPasswordForm: FormGroup;
    public isPasswordResetRequestSent = false;
    public submitting = false;
    public serverErrors: object;

    constructor(private formBuilder: FormBuilder, private apiService: APIService) {
        this.forgotPasswordForm = formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    public getFormControlError(): string {
        if (this.forgotPasswordForm.controls['email'].hasError('required')) {
            return 'Email address required';
        } else if (this.forgotPasswordForm.controls['email'].hasError('email')) {
            return 'Email address must be valid';
        } else {
            return '';
        }
    }

    public submit() {
        this.serverErrors = null;
        this.submitting = true;

        this.apiService.forgotPassword(this.forgotPasswordForm.value['email']).subscribe(
            () => this.isPasswordResetRequestSent = true,
            (apiError: APIError) => {
                this.serverErrors = formatAPIError(apiError);
                this.submitting = false;
            }
        );
    }
}
