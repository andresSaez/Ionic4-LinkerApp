import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MessagesService } from 'src/app/services/messages-service/messages.service';
import { IMessage } from 'src/app/interfaces/i-message.interface';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss'],
})
export class MessageInputComponent implements OnInit {

  @Output() sendMessage = new EventEmitter<IMessage>();
  @Input() idChat: string;
  text = '';
  newMessage: IMessage;


  constructor(
    private alertCtrl: AlertController,
    private _messagesService: MessagesService
  ) { }

  ngOnInit() {
    this.resetMessage();
  }

  send() {
    if (this.text.trim().length === 0) {
      return;
    }

    this.newMessage.content = this.text;

    this._messagesService.newMessage(this.newMessage, this.idChat).subscribe(
      resp => {
        console.log(resp);
        this.sendMessage.emit(resp);
        this.text = '';
        this.resetMessage();
      },
      async (error) => {
        (await this.alertCtrl.create({
          header: 'Oops, something has gone wrong ...',
          message: 'Please, try again',
          buttons: [
            {
              text: 'Ok',
              role: 'ok'
            }
          ]
        })).present();
      }
    )

  }

  resetMessage() {
    this.newMessage = {
      content: '',
      image: ''
    };
  }
}
