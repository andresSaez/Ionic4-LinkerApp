import { Component, OnInit, Input } from '@angular/core';
import { IMessage } from 'src/app/interfaces/i-message.interface';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss'],
})
export class ChatMessageComponent implements OnInit {

  @Input() mine: boolean;
  @Input() message: IMessage;

  constructor() { }

  ngOnInit() {}

}
