import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from 'src/app/interfaces/i-user.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ISettings } from 'src/app/interfaces/i-settings.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  readonly BASE_URL = 'users';

  constructor(
    private http: HttpClient
  ) { }

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

  saveProfile(user: IUser): Observable<boolean> {
    return this.http.put<{ ok: boolean }>(`${this.BASE_URL}/me`, user )
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

  addFriend( user: IUser ): Observable<IUser> {
    return this.http.post<{ user: IUser }>(`${this.BASE_URL}/me/friends`, user )
      .pipe(map(resp => {
        const u = resp.user;
        u.avatar = environment.baseUrl + '/' + u.avatar;
        return u;
      }));
  }

  getSettingsMine(): Observable<ISettings> {
    return this.http.get<{settings: ISettings}>(`${this.BASE_URL}/me/settings`)
      .pipe(map(resp => {
        const s = resp.settings;
        return s;
      }));
  }

  getUserSettings( id: string ): Observable<ISettings> {
    return this.http.get<{settings: ISettings}>(`${this.BASE_URL}/${id}/settings`)
      .pipe(map(resp => {
        const s = resp.settings;
        return s;
      }));
  }

}
