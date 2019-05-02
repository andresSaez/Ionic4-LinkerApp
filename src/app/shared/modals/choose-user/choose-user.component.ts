import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { IUser } from 'src/app/interfaces/i-user.interface';
import { UsersService } from 'src/app/services/users-service/users.service';

@Component({
  selector: 'app-choose-user',
  templateUrl: './choose-user.component.html',
  styleUrls: ['./choose-user.component.scss'],
})
export class ChooseUserComponent implements OnInit {

  users: IUser[] = [];
  filteredUsers: IUser[] = [];
  loadingFail = false;

  constructor(
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private _usersService: UsersService,
  ) { }

  ngOnInit() {
    this.chargeUsers();
  }

  selectUser( user: IUser ) {
    this.modalCtrl.dismiss({user: user});
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
      this.filteredUsers = this.users.filter( u => u.name.toLowerCase().includes( search ));
      await loading.dismiss();
    } else {
      await loading.dismiss();
      this.chargeUsers();
    }
  }

  async chargeUsers() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });

    await loading.present();

    this._usersService.getUsers().subscribe(
      async (resp) => {
        this.loadingFail = false;
        await loading.dismiss();
        this.users = resp;
        console.log(resp);
        this.filteredUsers = resp;
        console.log(this.filteredUsers);
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
      () => console.log('users loaded')
    );
  }
}
