import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPrivateRoom } from 'src/app/interfaces/i-private-room.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PrivateRoomService {

  readonly BASE_URL = 'private-rooms';

  constructor(
    private http: HttpClient
  ) { }

  getPrivateRooms(): Observable<IPrivateRoom[]> {
    return this.http.get<{ privateRooms: IPrivateRoom[] }>(this.BASE_URL)
      .pipe(map( resp => resp.privateRooms.map( r => {
        return r;
      })));
  }

  getPrivateRoomsMine(): Observable<IPrivateRoom[]> {
    return this.http.get<{ privateRooms: IPrivateRoom[] }>(`${this.BASE_URL}/mine`)
      .pipe(map(resp => resp.privateRooms.map(r => {
        return r;
      })));
  }

  newPrivateRoom( room: IPrivateRoom ): Observable<IPrivateRoom> {
    return this.http.post<{ result: IPrivateRoom }>( this.BASE_URL, room)
      .pipe(map( resp => {
        const r = resp.result;
        return r;
      }));
  }

  leavePrivateRoom( id: string ): Observable<void> {
    return this.http.put<{result: any}>(`${this.BASE_URL}/${id}/delete-member`, {})
      .pipe(map(resp => {
        const r = resp.result;
        return r;
      }));
  }
}
