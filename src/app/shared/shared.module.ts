import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactItemComponent } from './components/contact-item/contact-item.component';
import { IonicModule } from '@ionic/angular';
import { ChooseChatComponent } from './modals/choose-chat/choose-chat.component';
import { ChooseUserComponent } from './modals/choose-user/choose-user.component';
import { UserItemComponent } from './components/user-item/user-item.component';


@NgModule({
  declarations: [ ContactItemComponent, ChooseChatComponent, ChooseUserComponent, UserItemComponent ],
  entryComponents: [ ChooseChatComponent, ChooseUserComponent ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
      ContactItemComponent,
      ChooseChatComponent,
      ChooseUserComponent,
      UserItemComponent
  ]
})
export class SharedModule { }
