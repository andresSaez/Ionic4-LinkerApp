import { Component, OnInit } from '@angular/core';
import { PopoverController, NavController } from '@ionic/angular';
import { PrivateChatMenuPopoverComponent } from './popovers/private-chat-menu-popover/private-chat-menu-popover.component';
import { RoomChatMenuPopoverComponent } from './popovers/room-chat-menu-popover/room-chat-menu-popover.component';
import { ActivatedRoute } from '@angular/router';
import { IRoom } from '../interfaces/i-room.interface';
import { IPrivateRoom } from '../interfaces/i-private-room.interface';
import { ChatService } from '../services/chat-service/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  show = '';
  room: IRoom = null;
  privateRoom: IPrivateRoom = null;

  constructor(
    private route: ActivatedRoute,
    private popoverCtrl: PopoverController,
    private navCtrl: NavController,
    private _chatService: ChatService
  ) { }

  ngOnInit() {
    this.show = this.route.snapshot.data.show;

    if (this.show === 'room') {
      this.room = this.route.snapshot.data.room;
    } else {
      this.privateRoom = this.route.snapshot.data.proom;
    }
  }

  // Lo siguiente que me toca hacer es obtener el chat llamando al servicio.

  async showPopoverRoom( event: any ) {
    const popover = await this.popoverCtrl.create({
      component: RoomChatMenuPopoverComponent,
      componentProps: {},
      event: event
    });

    await popover.present();

    const result = await popover.onDidDismiss();

    if (result.data === 'map') {
      this.navCtrl.navigateForward(['/rooms/map', this.room.id]);
    }

    if (result.data === 'details') {
      this.navCtrl.navigateForward(['/rooms/details', this.room.id]);
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
      this.navCtrl.navigateForward(['/users/profile', this.privateRoom.addressee.id]);
    }
  }

}
