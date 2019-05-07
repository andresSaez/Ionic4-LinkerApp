import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IChat } from 'src/app/interfaces/i-chat.interface';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { WebSocketService } from '../web-socket-service/web-socket.service';
import { IMessage } from 'src/app/interfaces/i-message.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  readonly BASE_URL = 'chat';

  constructor(
    private http: HttpClient,
    public wsService: WebSocketService
  ) { }


  getChat( id: any ): Observable<IChat> {
    return this.http.get<{result: IChat}>(`${this.BASE_URL}/${id}`)
      .pipe(map(resp => {
        const chat = resp.result;
        // chat.lastmessage.creator.avatar = environment.baseUrl + '/' + chat.lastmessage.creator.avatar;
        chat.messages.map( m => {
          m.creator.avatar = environment.baseUrl + '/' + m.creator.avatar;
          return m;
        });
        return chat;
      }));
  }

  newChat(): Observable<IChat> {
    return this.http.post<{result: IChat}>(this.BASE_URL, {})
      .pipe(map(resp => {
        return resp.result;
      }));
  }

  sendMessage( message: IMessage, idChat: any ) {
    console.log('message: ' + message );

    const payload =  {
      message: message,
      chat: idChat
    };

    this.wsService.emit('message', JSON.stringify(payload) );
  }

  getMessages() {
    return this.wsService.listen('new-message');
  }



}
