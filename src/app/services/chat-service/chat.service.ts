import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IChat } from 'src/app/interfaces/i-chat.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  readonly BASE_URL = 'chat';

  constructor(
    private http: HttpClient
  ) { }


  getChat( id: string ): Observable<IChat> {
    return this.http.get<{result: IChat}>(`${this.BASE_URL}/${id}`)
      .pipe(map(resp => {
        return resp.result;
      }));
  }

  newChat(): Observable<IChat> {
    return this.http.post<{result: IChat}>(this.BASE_URL, {})
      .pipe(map(resp => {
        return resp.result;
      }));
  }

}
