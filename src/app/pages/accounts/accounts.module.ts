import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BiosysCoreModule } from '../../../biosys-core/biosys-core.module';
import { SharedModule } from '../../shared/shared.module';

import { ChangePasswordComponent } from './change-password/change-password.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {PanelModule} from 'primeng/panel';
import {MessagesModule} from 'primeng/messages';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PanelModule,
        MessagesModule,
        InputTextModule,
        ButtonModule,
        ProgressSpinnerModule,
        BiosysCoreModule,
        SharedModule
    ],
    declarations: [
        LoginComponent,
        ChangePasswordComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        ChangePasswordComponent
    ],
    exports: [
        LoginComponent,
        ChangePasswordComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent
    ]
})
export class AccountsModule {
}
