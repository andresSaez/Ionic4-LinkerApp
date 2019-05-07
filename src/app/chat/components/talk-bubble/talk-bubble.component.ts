import { Component, OnInit, Input } from '@angular/core';
import { IMessage } from 'src/app/interfaces/i-message.interface';

@Component({
  selector: 'app-talk-bubble',
  templateUrl: './talk-bubble.component.html',
  styleUrls: ['./talk-bubble.component.scss'],
})
export class TalkBubbleComponent implements OnInit {

  @Input() mine: boolean;
  @Input() messageBubble: IMessage;

  constructor() { }

  ngOnInit() {}

}
