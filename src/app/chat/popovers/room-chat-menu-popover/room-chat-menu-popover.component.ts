import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-room-chat-menu-popover',
  templateUrl: './room-chat-menu-popover.component.html',
  styleUrls: ['./room-chat-menu-popover.component.scss'],
})
export class RoomChatMenuPopoverComponent implements OnInit {

  constructor(
    public popoverCtrl: PopoverController
  ) { }

  ngOnInit() {}

  goRoomDetails() {
    this.popoverCtrl.dismiss('details');
  }

  goRoomMap() {
    this.popoverCtrl.dismiss('map');
  }

}
