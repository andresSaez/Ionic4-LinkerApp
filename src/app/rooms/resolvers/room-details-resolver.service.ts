import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IRoom } from 'src/app/interfaces/i-room.interface';
import { RoomService } from 'src/app/services/room-service/room.service';

@Injectable({
  providedIn: 'root'
})
export class RoomDetailsResolverService implements Resolve<IRoom> {

  constructor(
    private _roomServie: RoomService,
    private router: Router
  ) { }

  resolve( route: ActivatedRouteSnapshot): Observable<IRoom> {
    if (route.params['id'] && isNaN(route.params['id'])) {
      return this._roomServie.getRoom(route.params['id']).pipe(
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
