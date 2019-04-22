import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactItemComponent } from './components/contact-item/contact-item.component';
import { IonicModule } from '@ionic/angular';
import { ChooseChatComponent } from './modals/choose-chat/choose-chat.component';
import { ChooseUserComponent } from './modals/choose-user/choose-user.component';
import { UserItemComponent } from './components/user-item/user-item.component';
import { ShowImageComponent } from './modals/show-image/show-image.component';
import { SelectLocationComponent } from './modals/select-location/select-location.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { MatchDirective } from './validators/match-validator/match.directive';


@NgModule({
  declarations: [ ContactItemComponent,
                  ChooseChatComponent,
                  ChooseUserComponent,
                  UserItemComponent,
                  ShowImageComponent,
                  SelectLocationComponent,
                  MatchDirective
                ],
  entryComponents: [ ChooseChatComponent, ChooseUserComponent, ShowImageComponent, SelectLocationComponent ],
  imports: [
    CommonModule,
    IonicModule,
    NgxMapboxGLModule
  ],
  exports: [
      ContactItemComponent,
      ChooseChatComponent,
      ChooseUserComponent,
      UserItemComponent,
      ShowImageComponent,
      SelectLocationComponent,
      MatchDirective
  ]
})
export class SharedModule { }
