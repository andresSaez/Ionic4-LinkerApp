import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UsersService } from 'src/app/services/users-service/users.service';
import { IUser } from 'src/app/interfaces/i-user.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileResolverService implements Resolve<IUser> {

  constructor(
    private _usersService: UsersService,
    private router: Router
  ) { }

  resolve( route: ActivatedRouteSnapshot): Observable<IUser> {
    if (route.params['id'] && !isNaN(route.params['id'])) {
      return this._usersService.getUserProfile(route.params['id']).pipe(
        catchError(error => { this.router.navigate(['/home']);
          return of(null);
        })
      );
    } else {
      return this._usersService.getMyProfile().pipe(
        catchError(error => {
          this.router.navigate(['/home']);
            return of(null);
        })
      );
    }
  }
}
