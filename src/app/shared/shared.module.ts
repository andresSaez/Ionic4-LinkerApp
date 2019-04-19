import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactItemComponent } from './components/contact-item/contact-item.component';
import { IonicModule } from '@ionic/angular';
import { ChooseChatComponent } from './modals/choose-chat/choose-chat.component';
import { ChooseUserComponent } from './modals/choose-user/choose-user.component';
import { UserItemComponent } from './components/user-item/user-item.component';
import { ShowImageComponent } from './modals/show-image/show-image.component';


@NgModule({
  declarations: [ ContactItemComponent, ChooseChatComponent, ChooseUserComponent, UserItemComponent, ShowImageComponent ],
  entryComponents: [ ChooseChatComponent, ChooseUserComponent, ShowImageComponent ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
      ContactItemComponent,
      ChooseChatComponent,
      ChooseUserComponent,
      UserItemComponent,
      ShowImageComponent
  ]
})
export class SharedModule { }
