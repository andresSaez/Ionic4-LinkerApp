import { Component, OnInit, Input } from '@angular/core';
import { IRoom } from 'src/app/interfaces/i-room.interface';

@Component({
  selector: 'app-room-slide-item',
  templateUrl: './room-slide-item.component.html',
  styleUrls: ['./room-slide-item.component.scss'],
})
export class RoomSlideItemComponent implements OnInit {

  @Input() room: IRoom;

  constructor() { }

  ngOnInit() {}

}
