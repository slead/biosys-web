import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from '../../shared/services';
import { APIService } from '../../shared/services/api';

import { LoginComponent, LoginRoutes } from './index';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                HttpClientModule,
                RouterModule.forRoot(LoginRoutes),
            ],
            declarations: [ LoginComponent ],
            providers: [
                APIService,
                AuthService,
                {
                    provide: LocationStrategy,
                    useClass: HashLocationStrategy
                },
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should contain a form with username / password fields and a submit button', () => {
        expect(fixture.debugElement.query(By.css('form'))).toBeTruthy()
        expect(fixture.debugElement.query(By.css('#username'))).toBeTruthy()
        expect(fixture.debugElement.query(By.css('#password'))).toBeTruthy()
        expect(fixture.debugElement.query(By.css('button'))).toBeTruthy()
    });
});

