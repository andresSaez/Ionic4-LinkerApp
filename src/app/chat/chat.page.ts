import { Component, OnInit } from '@angular/core';
import { PopoverController, NavController } from '@ionic/angular';
import { PrivateChatMenuPopoverComponent } from './popovers/private-chat-menu-popover/private-chat-menu-popover.component';
import { RoomChatMenuPopoverComponent } from './popovers/room-chat-menu-popover/room-chat-menu-popover.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  room: boolean;

  constructor(
    private popoverCtrl: PopoverController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.room = true;
  }

  async showPopoverRoom( event: any ) {
    const popover = await this.popoverCtrl.create({
      component: RoomChatMenuPopoverComponent,
      componentProps: {},
      event: event
    });

    await popover.present();

    const result = await popover.onDidDismiss();

    if (result.data === 'map') {
      this.navCtrl.navigateForward('/rooms/map');
    }

    if (result.data === 'details') {
      this.navCtrl.navigateForward(['/rooms/details', '5ccfd948760b5f1234bae0cf' ]);
    }
  }

  async showPopoverPrivate( event: any ) {
    const popover = await this.popoverCtrl.create({
      component: PrivateChatMenuPopoverComponent,
      componentProps: {},
      event: event
    });

    await popover.present();

    const result = await popover.onDidDismiss();

    if (result.data === 'profile') {
      this.navCtrl.navigateForward('/users/profile');
    }
  }

}
