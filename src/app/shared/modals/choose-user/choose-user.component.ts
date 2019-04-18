import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-choose-user',
  templateUrl: './choose-user.component.html',
  styleUrls: ['./choose-user.component.scss'],
})
export class ChooseUserComponent implements OnInit {

  constructor(
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  selectUser() {
    this.modalCtrl.dismiss();
  }

  cancel() {
    this.modalCtrl.dismiss();
  }
}
