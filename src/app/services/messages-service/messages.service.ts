import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMessage } from 'src/app/interfaces/i-message.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  readonly BASE_URL = 'messages';

  constructor(
    private http: HttpClient
  ) { }

  newMessage( message: IMessage, idChat: string ): Observable<IMessage> {
    return this.http.post<{result: IMessage}>(`${this.BASE_URL}/${idChat}`, message)
      .pipe(map(resp => {
        const m = resp.result;

        if (m.image !== '') {
          m.image = environment.baseUrl + '/' + m.image;
        }
        return m;
      }));
  }
}
