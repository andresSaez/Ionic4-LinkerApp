import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-rooms-home',
  templateUrl: './rooms-home.page.html',
  styleUrls: ['./rooms-home.page.scss'],
})
export class RoomsHomePage implements OnInit {

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  constructor(
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }

  async openAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Do you want to join this room?',
      animated: true,
      buttons: [
        {
          text: 'Let\'s go!',
          cssClass: 'btn-success'
        },
        {
          text: 'Back',
          role: 'cancel'
        }
      ]
    });

    await alert.present();
  }

}
