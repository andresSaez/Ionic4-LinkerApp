import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRoom } from 'src/app/interfaces/i-room.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  readonly BASE_URL = 'rooms';

  constructor(
    private http: HttpClient
  ) { }

  newRoom( room: IRoom ): Observable<IRoom> {
    return this.http.post<{ room: IRoom }>( this.BASE_URL, room)
      .pipe(map( resp => {
        const r = resp.room;
        r.image = environment.baseUrl + '/' + r.image;
        return r;
      }));
  }

}
