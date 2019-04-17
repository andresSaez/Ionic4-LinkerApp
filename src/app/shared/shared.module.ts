import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactItemComponent } from './components/contact-item/contact-item.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [ ContactItemComponent ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
      ContactItemComponent
  ]
})
export class SharedModule { }
