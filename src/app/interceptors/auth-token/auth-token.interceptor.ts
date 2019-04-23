import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(environment.TOKEN);

      if (token) { // Clone the request to add the new header.
        const authReq = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + token)});
         // Pass on the cloned request instead of the original request.
         return next.handle(authReq);
      }
    return next.handle(req);
  }
}
