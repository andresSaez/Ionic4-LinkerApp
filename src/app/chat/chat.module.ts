import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChatPage } from './chat.page';
import { TalkBubbleComponent } from './components/talk-bubble/talk-bubble.component';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';
import { MessageInputComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: ChatPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChatPage, TalkBubbleComponent, ChatMessageComponent, MessageInputComponent ]
})
export class ChatPageModule {}
