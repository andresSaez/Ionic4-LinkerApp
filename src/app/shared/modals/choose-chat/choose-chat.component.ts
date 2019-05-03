import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { IRoom } from 'src/app/interfaces/i-room.interface';
import { RoomService } from 'src/app/services/room-service/room.service';

@Component({
  selector: 'app-choose-chat',
  templateUrl: './choose-chat.component.html',
  styleUrls: ['./choose-chat.component.scss'],
})
export class ChooseChatComponent implements OnInit {

  rooms: IRoom[] = [];
  filteredRooms: IRoom[] = [];
  loadingFail = false;
  @Input() roomExceptionsIds: string[];

  constructor(
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private _roomService: RoomService,
  ) { }

  ngOnInit() {
    this.chargeRooms();
  }

  selectRoom( room: IRoom ) {
    this.modalCtrl.dismiss({room: room});
  }

  cancel() {
    this.modalCtrl.dismiss();
  }

  async filterItems( event ) {
    let search: string = event.target.value;

    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });

    await loading.present();

    if (search && search.trim() !== '') {
      search = search.trim().toLowerCase();
      this.filteredRooms = this.rooms.filter( u => u.name.toLowerCase().includes( search ));
      this.getCorrectedItems();
      await loading.dismiss();
    } else {
      await loading.dismiss();
      this.chargeRooms();
    }
  }

  async chargeRooms() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });

    await loading.present();

    this._roomService.getRoomsMine().subscribe(
      async (resp) => {
        this.loadingFail = false;
        await loading.dismiss();
        this.rooms = resp;
        this.filteredRooms = resp;
        this.getCorrectedItems();
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
      },
      () => console.log('rooms loaded')
    );
  }

  private getCorrectedItems() {
    this.filteredRooms = this.filteredRooms.filter( (el: any) => !this.roomExceptionsIds.includes(el.id));
  }

}
