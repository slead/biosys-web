import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy, Location } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { APIService } from '../../../../biosys-core/services/api.service';
import { MockAPIService } from '../../../../biosys-core/mocks/mock-api.service';
import { AuthService } from '../../../../biosys-core/services/auth.service';

import { AccountsRoutes } from '../accounts.routes';
import { LoginComponent } from './login.component';
import { AccountsModule } from '../accounts.module';


describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let router: Router;
    let location: Location;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                HttpClientModule,
                RouterModule.forRoot(AccountsRoutes),
                AccountsModule
            ],
            providers: [
                {
                    provide: LocationStrategy,
                    useClass: HashLocationStrategy
                },
                {
                    provide: APIService,
                    useClass: MockAPIService
                },
                AuthService
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        router = TestBed.get(Router);
        location = TestBed.get(Location);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should contain a form with username / password fields and a submit button', () => {
        expect(fixture.debugElement.query(By.css('form'))).toBeTruthy();
        expect(fixture.debugElement.query(By.css('#username'))).toBeTruthy();
        expect(fixture.debugElement.query(By.css('#password'))).toBeTruthy();
        expect(fixture.debugElement.query(By.css('button'))).toBeTruthy();
    });

    it('should login in when username / password entered submit pressed', () => {
        spyOn(component, 'login');

        component.loginForm.controls['username'].setValue('user1');
        component.loginForm.controls['password'].setValue('t35tP@55w0rd');

        const submitButton = fixture.debugElement.query(By.css('button')).nativeElement;
        submitButton.click();

        fixture.detectChanges();

        expect(component.login).toHaveBeenCalled();

        // expect(location.path()).toBe('/');
    });
});

