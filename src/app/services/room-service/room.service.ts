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
    return this.http.get<{ result: IRoom[] }>(this.BASE_URL)
      .pipe(map( resp => resp.result.map( r => {
        r.image = environment.baseUrl + '/' + r.image;
        return r;
      })));
  }

  getRoom( id: string ): Observable<IRoom> {
    return this.http.get<{ result: IRoom }>(`${this.BASE_URL}/${id}`)
      .pipe(
        map(resp => {
          const r = resp.result;
          r.image = environment.baseUrl + '/' + r.image;
          r.creator.avatar = environment.baseUrl + '/' + r.creator.avatar;
          return r;
        })
      );
  }

  getRoomsMine(): Observable<IRoom[]> {
    return this.http.get<{ result: IRoom[] }>(`${this.BASE_URL}/me`)
      .pipe(map(resp => resp.result.map(r => {
        r.image = environment.baseUrl + '/' + r.image;
        return r;
      })));
  }

  newRoom( room: IRoom ): Observable<IRoom> {
    return this.http.post<{ result: IRoom }>( this.BASE_URL, room)
      .pipe(map( resp => {
        const r = resp.result;
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

  updateRoom( room: IRoom ): Observable<IRoom> {
    return this.http.put<{result: IRoom}>(this.BASE_URL, room)
      .pipe(map(resp => {
        const r = resp.result;
        r.image = environment.baseUrl + '/' + r.image;
        return r;
      }));
  }

  addMemberToRoom( id: string ): Observable<IRoom> {
    return this.http.put<{result: IRoom}>(`${this.BASE_URL}/${id}/add-member`, {})
      .pipe(map(resp => {
        const r = resp.result;
        r.image = environment.baseUrl + '/' + r.image;
        return r;
      }));
  }

}
