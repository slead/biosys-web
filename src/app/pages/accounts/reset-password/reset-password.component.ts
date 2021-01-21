import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { APIService } from '../../../../biosys-core/services/api.service';
import { fieldMatchValidator } from '../../../shared/utils/form-validators';
import { APIError } from '../../../../biosys-core/interfaces/api.interfaces';
import { formatAPIError } from '../../../../biosys-core/utils/functions';

@Component({
    selector: 'biosys-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
    public resetPasswordForm: FormGroup;
    public isPasswordReset = false;
    public serverErrors: object;

    private uid: string;
    private token: string;

    constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder,
                private apiService: APIService) {
        this.uid = route.snapshot.params['uid'];
        this.token = route.snapshot.params['token'];

        this.resetPasswordForm = formBuilder.group({
            password: ['', Validators.required],
            passwordConfirm: ['', Validators.required]
        }, {
            validator: fieldMatchValidator('password', 'passwordConfirm')
        });
    }

    public resetPassword(event: Event) {
        event.preventDefault();

        this.apiService.resetPassword(this.uid, this.token, this.resetPasswordForm.value['password']).subscribe(
            () => this.isPasswordReset = true,
            (apiError: APIError) => this.serverErrors = formatAPIError(apiError)
        );
    }
}
