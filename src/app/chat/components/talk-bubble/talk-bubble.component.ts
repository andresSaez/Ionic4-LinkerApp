import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-talk-bubble',
  templateUrl: './talk-bubble.component.html',
  styleUrls: ['./talk-bubble.component.scss'],
})
export class TalkBubbleComponent implements OnInit {

  @Input() mine: boolean;

  constructor() { }

  ngOnInit() {}

}
