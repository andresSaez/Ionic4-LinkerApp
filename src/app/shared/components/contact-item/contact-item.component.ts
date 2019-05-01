import { Component, OnInit, Input } from '@angular/core';
import { IRoom } from 'src/app/interfaces/i-room.interface';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.scss'],
})
export class ContactItemComponent implements OnInit {

  @Input() group: boolean;
  @Input() sliding: boolean;
  @Input() room: IRoom;

  constructor() { }

  ngOnInit() {}

}
