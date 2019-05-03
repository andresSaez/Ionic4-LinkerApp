import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from 'src/app/interfaces/i-user.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ISettings } from 'src/app/interfaces/i-settings.interface';
import { IRoom } from 'src/app/interfaces/i-room.interface';
import { IPrivateRoom } from 'src/app/interfaces/i-private-room.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  readonly BASE_URL = 'users';

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<IUser[]> {
    return this.http.get<{users: IUser[]}>(this.BASE_URL)
      .pipe(map(resp => resp.users.map(r => {
        r.avatar = environment.baseUrl + '/' + r.avatar;
        return r;
      })));
  }

  getMyProfile(): Observable<IUser> {
    return this.http.get<{user: IUser}>(`${this.BASE_URL}/me`)
      .pipe(map(resp => {
        const u = resp.user;
        u.avatar = environment.baseUrl + '/' + u.avatar;
        return u;
      }));
  }

  getUserProfile(id: string ): Observable<IUser> {
    return this.http.get<{user: IUser}>(`${this.BASE_URL}/${id}`)
      .pipe(map(resp => {
        const u = resp.user;
        u.avatar = environment.baseUrl + '/' + u.avatar;
        return u;
      }));
  }

  getBlockedUsers(): Observable<IUser[]> {
    return this.http.get<{result: IUser[]}>(`${this.BASE_URL}/me/settings/blockedusers`)
      .pipe(map( resp => resp.result.map( r => {
        r.avatar = environment.baseUrl + '/' + r.avatar;
        return r;
      })));
  }

  getRoomExceptions(): Observable<IRoom[]> {
    return this.http.get<{result: IRoom[]}>(`${this.BASE_URL}/me/settings/room-exceptions`)
      .pipe(map( resp => resp.result.map( r => {
        r.image = environment.baseUrl + '/' + r.image;
        return r;
      })));
  }

  getPrivateRoomExceptions(): Observable<IPrivateRoom[]> {
    return this.http.get<{result: IPrivateRoom[]}>(`${this.BASE_URL}/me/settings/proom-exceptions`)
      .pipe(map( resp => resp.result.map( r => {
        return r;
      })));
  }

  getMyFriends(): Observable<IUser[]> {
    return this.http.get<{result: IUser[]}>(`${this.BASE_URL}/me/friends`)
      .pipe(map(resp => resp.result.map( r => {
        r.avatar = environment.baseUrl + '/' + r.avatar;
        return r;
      })));
  }

  getSettingsMine(): Observable<ISettings> {
    return this.http.get<{result: ISettings}>(`${this.BASE_URL}/me/settings`)
      .pipe(map(resp => {
        const s = resp.result;
        return s;
      }));
  }

  /**
   * ESTE SERVICIO NO ESTÁ IMPLEMENTADO TODAVÍA
   */
  getUserSettings( id: string ): Observable<ISettings> {
    return this.http.get<{settings: ISettings}>(`${this.BASE_URL}/${id}/settings`)
      .pipe(map(resp => {
        const s = resp.settings;
        return s;
      }));
  }

  saveProfile(user: IUser): Observable<Boolean> {
    return this.http.put<{ ok: Boolean }>(`${this.BASE_URL}/me`, user )
    .pipe(map(resp => {
      return resp.ok;
     }));
  }

  saveAvatar(avatar: string): Observable<string> {
    return this.http.put<{avatar: string}>(`${this.BASE_URL}/me/avatar`, {avatar: avatar})
      .pipe(map(resp => {
        return resp.avatar;
      }));
  }

  savePassword(password: string): Observable<Boolean> {
    return this.http.put<{ok: Boolean}>(`${this.BASE_URL}/me/password`, {password: password})
      .pipe(map(resp => {
        return resp.ok;
      }));
  }

  saveSettings( settings: ISettings ): Observable<ISettings> {
    return this.http.put<{result: ISettings}>(`${this.BASE_URL}/me/settings`, settings )
      .pipe(map(resp => {
        return resp.result;
      }));
  }

  addFriend( user: IUser ): Observable<Boolean> {
    return this.http.put<{ ok: Boolean }>(`${this.BASE_URL}/me/friends`, user )
      .pipe(map(resp => {
        return resp.ok;
      }));
  }

  deleteAccount(): Observable<Boolean> {
    return this.http.delete<{ ok: Boolean}>(`${this.BASE_URL}/me`)
      .pipe(map(resp => resp.ok));
  }

}
