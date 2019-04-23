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

  getRooms(): Observable<IRoom[]> {
    return this.http.get<{ rooms: IRoom[] }>(this.BASE_URL)
      .pipe(map( resp => resp.rooms.map( r => {
        r.image = environment.baseUrl + '/' + r.image;
        return r;
      })));
  }

  getRoom( id: string ): Observable<IRoom> {
    return this.http.get<{ room: IRoom }>(`${this.BASE_URL}/${id}`)
      .pipe(
        map(resp => {
          const r = resp.room;
          r.image = environment.baseUrl + '/' + r.image;
          r.creator.avatar = environment.baseUrl + '/' + r.creator.avatar;
          return r;
        })
      );
  }

  getRoomsMine(): Observable<IRoom[]> {
    return this.http.get<{ rooms: IRoom[] }>(`${this.BASE_URL}/mine`)
      .pipe(map(resp => resp.rooms.map(r => {
        r.image = environment.baseUrl + '/' + r.image;
        return r;
      })));
  }

  newRoom( room: IRoom ): Observable<IRoom> {
    return this.http.post<{ room: IRoom }>( this.BASE_URL, room)
      .pipe(map( resp => {
        const r = resp.room;
        r.image = environment.baseUrl + '/' + r.image;
        return r;
      }));
  }

  saveImage(image: string, id: string ): Observable<string> {
    return this.http.put<{image: string}>(`${this.BASE_URL}/${id}/image`, {image: image})
      .pipe(map(resp => {
        return resp.image;
      }));
  }

}
