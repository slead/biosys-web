import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PanelModule, MessagesModule, InputTextModule, ButtonModule } from 'primeng/primeng';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PanelModule,
        MessagesModule,
        InputTextModule,
        ButtonModule],
    declarations: [LoginComponent],
    exports: [LoginComponent]
})
export class LoginModule {
}
