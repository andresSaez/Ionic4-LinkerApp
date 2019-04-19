import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-show-image',
  templateUrl: './show-image.component.html',
  styleUrls: ['./show-image.component.scss'],
})
export class ShowImageComponent implements OnInit {

  constructor(
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  cancel() {
    this.modalCtrl.dismiss();
  }

}
