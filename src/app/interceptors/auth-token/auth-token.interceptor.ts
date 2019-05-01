import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';
import { switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(
    private storage: Storage
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.storage.get(environment.TOKEN)).pipe(
      switchMap(token => {
        if (!token) { throw new Error(); }

        const authReq = req.clone({
          headers: req.headers.set('Authorization', `bearer ${token}`)
        });
        // Pass on the cloned request instead of the original request.
        return next.handle(authReq);
      }),
      catchError(e => next.handle(req))
    );
  }
}
