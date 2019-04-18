import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-choose-chat',
  templateUrl: './choose-chat.component.html',
  styleUrls: ['./choose-chat.component.scss'],
})
export class ChooseChatComponent implements OnInit {

  constructor(
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  selectChat() {
    this.modalCtrl.dismiss();
  }

  cancel() {
    this.modalCtrl.dismiss();
  }

}
