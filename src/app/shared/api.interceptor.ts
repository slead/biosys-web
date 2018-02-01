import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './services/index';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({headers: req.headers.set('content-type', 'application/json')});

        let authToken = AuthService.getAuthToken();
        if (authToken) {
            req = req.clone({
                headers: req.headers.set('Authorization', 'Token ' + authToken),
                withCredentials: true
            });
        }

        return next.handle(req);
    }
}
