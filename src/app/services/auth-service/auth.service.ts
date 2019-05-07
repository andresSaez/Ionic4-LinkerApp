import { Injectable, EventEmitter } from '@angular/core';
import { IUser } from 'src/app/interfaces/i-user.interface';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as fromActions from '../../store/actions';

export interface ResponseLogin {
  error: boolean;
  accessToken: string;
}

export interface ResponseValidate {
  ok: boolean;
}

export interface ILoginGoogleFbRequest {
  token: string;
  lat?: number;
  lng?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly BASE_URL = 'auth';
  logged = false;
  loginChange$ = new EventEmitter<boolean>();

  constructor(
    private storage: Storage,
    private http: HttpClient,
    private store: Store<AppState>
  ) { }

  private setLogged(logged: boolean) {
    this.logged = logged;
    this.loginChange$.emit(logged);
  }

  // login(userInfo: IUser): Observable<void> {
  //   return this.http.post<ResponseLogin>(`${this.BASE_URL}/login`, userInfo)
  //     .pipe(map(resp => {
  //       localStorage.setItem(environment.TOKEN, resp.accessToken);
  //       this.logged = true;
  //       this.loginChange$.emit(true);
  //     }
  //     ));
  // }

  login(userInfo: IUser): Observable<void> {
    return this.http.post<ResponseLogin>(`${this.BASE_URL}/login`, userInfo)
      .pipe(switchMap( async r => {
        try {
          await this.storage.set(environment.TOKEN, r.accessToken);
          this.setLogged(true);
        } catch (e) {
          throw new Error(`Can't save authentication token in storage!`);
        }
      })
      );
  }

  // logout() {
  //   const userToken = localStorage.getItem(environment.TOKEN);

  //       if (userToken !== null) {
  //         localStorage.removeItem(environment.TOKEN);
  //         this.logged = false;
  //         this.loginChange$.emit(false);
  //       }
  // }

  async logout() {
    await this.storage.remove(environment.TOKEN);
    this.store.dispatch(new fromActions.UnsetSettings());
    this.store.dispatch(new fromActions.UnsetUser());
    this.store.dispatch(new fromActions.UnsetAllRooms());
    this.setLogged(false);
  }

  isLogged(): Observable<boolean> {
    if (this.logged) { return of(true); }

    return from(this.storage.get(environment.TOKEN)).pipe(
      switchMap(v => {
        if (!v) { throw new Error(); }
        return this.http.get(`${this.BASE_URL}/validate`).pipe(
          map(() => {
            this.setLogged(true);
            return true;
          }), catchError(error => of(false))
        );
      }),
      catchError(e => of(false))
    );
  }

  // isLogged(): Observable<boolean> {
  //   const userToken = localStorage.getItem(environment.TOKEN);

  //   if (this.logged) {
  //     return of(true);
  //   } else {
  //     if (userToken !== null) {
  //       return this.http.get<ResponseValidate>(`${this.BASE_URL}/validate`)
  //         .pipe(
  //           map(resp => {
  //             if (resp.ok) {
  //               this.logged = true;
  //               this.loginChange$.emit(true);
  //             }
  //             return resp.ok;
  //         }));
  //     } else {
  //       return of(false);
  //     }
  //   }
  // }

  register(userInfo: IUser): Observable<void> {
    return this.http.post<any>(`${this.BASE_URL}/register`, userInfo )
      .pipe(map(resp => resp)
      );
  }

  loginGoogle(peticion: ILoginGoogleFbRequest): Observable<void> {
    return this.http.post<ResponseLogin>(`${this.BASE_URL}/google`, peticion)
      .pipe(switchMap( async r => {
        try {
          await this.storage.set(environment.TOKEN, r.accessToken);
          this.setLogged(true);
        } catch (e) {
          throw new Error(`Can't save authentication token in storage!`);
        }
      })
      );
  }

  loginFacebook(peticion: ILoginGoogleFbRequest): Observable<void> {
    return this.http.post<ResponseLogin>(`${this.BASE_URL}/facebook`, peticion)
      .pipe(switchMap( async r => {
        try {
          await this.storage.set(environment.TOKEN, r.accessToken);
          this.setLogged(true);
        } catch (e) {
          throw new Error(`Can't save authentication token in storage!`);
        }
      })
      );
  }

  loginTwitter( request: ILoginGoogleFbRequest ): Observable<void> {
    return this.http.post<ResponseLogin>(`${this.BASE_URL}/twitter`, request)
      .pipe(switchMap( async r => {
        try {
          await this.storage.set(environment.TOKEN, r.accessToken);
          this.setLogged(true);
        } catch (e) {
          throw new Error(`Can't save authentication token in storage!`);
        }
      })
      );

      // <meta-data
      // android:name="io.fabric.ApiKey"
      // android:value="d595b8aee0de1d1c5677ad0fbd083d7ac0746f66"

//       Consumer API keys
// d3dVGp7aGIYoDtyQikX21HCbx (API key)

// nbSLVCI87oYRbgfb0gEgu0rTF1gI8GUQgLGlnJhcCNVV89rTBs (API secret key)
  }

}
