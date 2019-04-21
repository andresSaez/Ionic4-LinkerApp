import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PrivateChatMenuPopoverComponent } from './popovers/private-chat-menu-popover/private-chat-menu-popover.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  room: boolean;

  constructor(
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() {
    this.room = true;
  }

  async showPopover( event: any ) {
    const popover = await this.popoverCtrl.create({
      component: PrivateChatMenuPopoverComponent,
      componentProps: {},
      event: event
    });

    await popover.present();
  }

}
