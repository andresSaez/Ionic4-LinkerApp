import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginActivateGuard implements CanActivate  {

  constructor(
    private router: Router,
    private _authService: AuthService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    return this._authService.isLogged().pipe(
      map(result => {
        if (!result) {
          this.router.navigate(['/auth/login']);
        }
        return result;
      })
    );
  }
}
