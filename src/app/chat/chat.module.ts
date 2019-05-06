import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChatPage } from './chat.page';
import { TalkBubbleComponent } from './components/talk-bubble/talk-bubble.component';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';
import { MessageInputComponent } from './components';
import { PrivateChatMenuPopoverComponent } from './popovers/private-chat-menu-popover/private-chat-menu-popover.component';
import { RoomChatMenuPopoverComponent } from './popovers/room-chat-menu-popover/room-chat-menu-popover.component';
import { RoomDetailsResolverService } from '../rooms/resolvers/room-details-resolver.service';
import { PrivateRoomResolverService } from '../shared/resolvers/private-room-resolver.service';

const routes: Routes = [
  {
    path: 'private/:id',
    component: ChatPage,
    data: { show: 'private' },
    resolve: { proom: PrivateRoomResolverService }
  },
  {
    path: 'room/:id',
    component: ChatPage,
    data: { show: 'room' },
    resolve: { room: RoomDetailsResolverService }
  }
  // {
  //   path: '',
  //   component: ChatPage
  // }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChatPage, TalkBubbleComponent, ChatMessageComponent, MessageInputComponent, PrivateChatMenuPopoverComponent,
  RoomChatMenuPopoverComponent ],
  entryComponents: [ PrivateChatMenuPopoverComponent, RoomChatMenuPopoverComponent]
})
export class ChatPageModule {}
