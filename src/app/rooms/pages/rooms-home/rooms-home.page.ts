import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, LoadingController } from '@ionic/angular';
import { IRoom } from 'src/app/interfaces/i-room.interface';
import { RoomService } from 'src/app/services/room-service/room.service';

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

  rooms: IRoom[] = [];
  filteredRooms: IRoom[] = [];
  loadingFail = false;

  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private _roomService: RoomService
  ) { }

  ngOnInit() {
    this.getRooms();
  }

  async getRooms() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });

    await loading.present();

    this._roomService.getRooms()
      .subscribe(
        async (rooms) => {
          this.loadingFail = false;
          await loading.dismiss();
          this.rooms = rooms;
          this.filteredRooms = rooms;
        },
        async (error) => {
          await loading.dismiss();
          (await this.alertCtrl.create({
            header: 'Oops, something has gone wrong ...',
            message: 'Please, try again',
            buttons: [
              {
                text: 'Ok',
                role: 'ok',
                handler: () => {
                  this.loadingFail = true;
                }
              }
            ]
          })).present();
         }
      );

  }

  async searchRoom( event ) {
    let searchText: string = event.target.value;

    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });

    await loading.present();

    if ( searchText && searchText.trim() !== '') {
      searchText = searchText.trim().toLowerCase();
      this.filteredRooms = this.rooms.filter( r => r.name.toLowerCase().includes( searchText ));
      await loading.dismiss();
    } else {
      await loading.dismiss();
      this.getRooms();
    }

  }

  async openAlert( room: IRoom ) {
    const alert = await this.alertCtrl.create({
      header: 'Do you want to join this room?',
      animated: true,
      buttons: [
        {
          text: 'Let\'s go!',
          cssClass: 'btn-success',
          role: 'ok'
        },
        {
          text: 'Back',
          role: 'cancel'
        }
      ]
    });

    await alert.present();
    const result = await alert.onDidDismiss();

    if (result.role === 'ok') {
      // DEBERIA METER EN EL SOTORE LA SALA QUE HE ELEGIDO Y NAVEGAR AL CHAT CORRESPONDIENTE
      this.navCtrl.navigateForward(['/chat', room.id ]);
    }
  }

}
