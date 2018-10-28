import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    public headers: HttpHeaders;
    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // append headers
        this.headers = new HttpHeaders();
        this.headers.set('Content-Type', 'application/jsonwa');
        this.headers.set('Access-Control-Allow-Origin', '*');
        this.headers.set('Access-Control-Allow-Headers', 'Origin, Authorization, Content-Type, Accept');

        request = request.clone({
            headers: this.headers
        });
        // add authorization header with jwt token if available
        let currentUser = JSON.parse(localStorage.getItem('mobile'));
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${currentUser}`
            }
        });

        return next.handle(request);
    }
}
