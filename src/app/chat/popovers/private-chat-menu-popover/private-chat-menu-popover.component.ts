import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-private-chat-menu-popover',
  templateUrl: './private-chat-menu-popover.component.html',
  styleUrls: ['./private-chat-menu-popover.component.scss'],
})
export class PrivateChatMenuPopoverComponent implements OnInit {

  constructor(
    public popoverCtrl: PopoverController
  ) { }

  ngOnInit() {
    console.log('popover');
  }

  close() {
    this.popoverCtrl.dismiss('profile');
  }

}
