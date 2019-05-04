import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-eliminate-account',
  templateUrl: './eliminate-account.component.html',
  styleUrls: ['./eliminate-account.component.scss'],
})
export class EliminateAccountComponent implements OnInit {

  constructor(
    public modalCtrl: ModalController

  ) { }

  ngOnInit() {}


  eliminateAccount() {
    this.modalCtrl.dismiss({ok: true});
  }
  cancel() {
    this.modalCtrl.dismiss();
  }

}
