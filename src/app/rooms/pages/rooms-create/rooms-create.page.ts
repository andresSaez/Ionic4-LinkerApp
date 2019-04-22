import { Component, OnInit } from '@angular/core';
import { IRoom } from 'src/app/interfaces/i-room.interface';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { SelectLocationComponent } from 'src/app/shared/modals/select-location/select-location.component';

@Component({
  selector: 'app-rooms-create',
  templateUrl: './rooms-create.page.html',
  styleUrls: ['./rooms-create.page.scss'],
})
export class RoomsCreatePage implements OnInit {

  newRoom: IRoom = {
    name: '',
    description: '',
    image: '../../../../assets/images/default-image.jpg',
    hastags: [],
    date: new Date().toDateString(),
    lat: null,
    lng: null
  };

  hastag = '';

  hastagList: string[] = [];

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  submitCreateRoomForm() {

  }

  deleteHastag( hastag: string ) {
    this.newRoom.hastags = this.newRoom.hastags.filter( i => i !== hastag);
  }

  addHastag() {
    this.newRoom.hastags.push( this.hastag );
    this.hastag = '';
  }

  async openActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Choose one',
      mode: 'ios',
      buttons: [
        {
          text: 'Camera',
          icon: 'camera',
          cssClass: 'text-dark'
        },
        {
          text: 'Gallery',
          icon: 'images',
          cssClass: 'text-dark'
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  async openSelectLocation() {
    const modal = await this.modalCtrl.create({
      component: SelectLocationComponent,
      componentProps: { lat: this.newRoom.lat, lng: this.newRoom.lng }
    });

    await modal.present();

    const result = await modal.onDidDismiss();
    this.newRoom.lat = result.data.lat;
    this.newRoom.lng = result.data.lng;
  }


}
