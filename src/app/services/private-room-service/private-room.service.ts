import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPrivateRoom } from 'src/app/interfaces/i-private-room.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrivateRoomService {

  readonly BASE_URL = 'private-rooms';

  constructor(
    private http: HttpClient
  ) { }

  getPrivateRoom( id: string ): Observable<IPrivateRoom> {
    return this.http.get<{ result: IPrivateRoom }>(`${this.BASE_URL}/${id}`)
      .pipe(
        map(resp => {
          const r = resp.result;
          r.addressee.avatar = environment.baseUrl + '/' + r.addressee.avatar;
          r.members = r.members.map( (member: any) => {
            member.avatar = environment.baseUrl + '/' + member.avatar;
            return member;
          });
          return r;
        })
      );
  }

  getPrivateRooms(): Observable<IPrivateRoom[]> {
    return this.http.get<{ result: IPrivateRoom[] }>(this.BASE_URL)
      .pipe(map( resp => resp.result.map( r => {
        return r;
      })));
  }

  getPrivateRoomsMine(): Observable<IPrivateRoom[]> {
    return this.http.get<{ result: IPrivateRoom[] }>(`${this.BASE_URL}/mine`)
      .pipe(map(resp => resp.result.map(r => {
        r.addressee.avatar = environment.baseUrl + '/' + r.addressee.avatar;
        return r;
      })));
  }

  newPrivateRoom( userId: string ): Observable<IPrivateRoom> {
    return this.http.post<{ result: IPrivateRoom }>( this.BASE_URL, {id: userId} )
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
