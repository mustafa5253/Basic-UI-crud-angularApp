import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    public headers: HttpHeaders;

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.headers = new HttpHeaders();
        this.headers.set('Content-Type', 'application/json');
        this.headers.set('Access-Control-Allow-Origin', '*');
        this.headers.set('Access-Control-Allow-Headers', 'Origin, Authorization, Content-Type, Accept');

        request = request.clone({
            headers: this.headers
        });

        let currentUser = JSON.parse(localStorage.getItem('mobile'));
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${currentUser}`
            }
        });

        return next.handle(request).pipe(
            tap(event => {
              if (event instanceof HttpResponse) {
                console.log(event.status);
              }
            }, error => {
                   // http response status code
                  console.log('response');
                  console.error(error.message);
            })
          );
    }
}
