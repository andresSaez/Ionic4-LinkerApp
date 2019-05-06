import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IPrivateRoom } from 'src/app/interfaces/i-private-room.interface';
import { PrivateRoomService } from 'src/app/services/private-room-service/private-room.service';

@Injectable({
  providedIn: 'root'
})
export class PrivateRoomResolverService implements Resolve<IPrivateRoom> {

  constructor(
    private _privateRoomServie: PrivateRoomService,
    private router: Router
  ) { }

  resolve( route: ActivatedRouteSnapshot): Observable<IPrivateRoom> {
    if (route.params['id'] && isNaN(route.params['id'])) {
      return this._privateRoomServie.getPrivateRoom(route.params['id']).pipe(
        catchError(error => { this.router.navigate(['/home']);
          return of(null);
        })
      );
    } else {
        this.router.navigate(['/home']);
        return of(null);
    }
  }
}
