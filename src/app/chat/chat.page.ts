import { Component, OnInit, OnDestroy } from '@angular/core';
import { PopoverController, NavController, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { PrivateChatMenuPopoverComponent } from './popovers/private-chat-menu-popover/private-chat-menu-popover.component';
import { RoomChatMenuPopoverComponent } from './popovers/room-chat-menu-popover/room-chat-menu-popover.component';
import { ActivatedRoute } from '@angular/router';
import { IRoom } from '../interfaces/i-room.interface';
import { IPrivateRoom } from '../interfaces/i-private-room.interface';
import { ChatService } from '../services/chat-service/chat.service';
import { IMessage } from '../interfaces/i-message.interface';
import { IChat } from '../interfaces/i-chat.interface';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit, OnDestroy {

  show = '';
  room: IRoom = null;
  privateRoom: IPrivateRoom = null;
  messages: IMessage[] = [];
  chat: IChat = null;
  messagesSubscription: Subscription;
  idChat: any;
  currentDate = new Date();

  userState: any;
  subscription: Subscription = new Subscription();


  loadingFail = false;
  loaded = false;
  chatContainer: HTMLElement;

  constructor(
    private route: ActivatedRoute,
    private popoverCtrl: PopoverController,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private _chatService: ChatService,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.chatContainer = document.getElementById('chat-container');
    this.show = this.route.snapshot.data.show;
    this.room = this.route.snapshot.data.room;
    this.privateRoom = this.route.snapshot.data.proom;

    this.subscription = this.store.select('user').subscribe(
      userState => {
        this.userState = userState.user;
      }
    );

    if (this.show === 'room') {
      this.idChat = <any>this.room.chat;
      this.getChat(<any>this.room.chat);
    } else {
      this.idChat = <any>this.privateRoom.chat.id;
      this.getChat(<any>this.privateRoom.chat.id);
    }

    this.messagesSubscription = this._chatService.getMessages().subscribe(
      (msg: any) => {
        // console.log('escuchando: ' + msg);
        if (msg.chat === this.idChat) {
          msg.message.creator.avatar = environment.baseUrl + '/' + msg.message.creator.avatar;
          if (msg.message.creator.id  !== this.userState.id) {
            msg.message.mine = false;
          }
          this.pushMessage( msg.message );
        }
      }
    );
  }

  ngOnDestroy() {
    this.messagesSubscription.unsubscribe();
    this.subscription.unsubscribe();
  }

  // Lo siguiente que me toca hacer es obtener el chat llamando al servicio.

  async showPopoverRoom( event: any ) {
    const popover = await this.popoverCtrl.create({
      component: RoomChatMenuPopoverComponent,
      componentProps: {},
      event: event
    });

    await popover.present();

    const result = await popover.onDidDismiss();

    if (result.data === 'map') {
      this.navCtrl.navigateForward(['/rooms/map', this.room.id]);
    }

    if (result.data === 'details') {
      this.navCtrl.navigateForward(['/rooms/details', this.room.id]);
    }
  }

  async showPopoverPrivate( event: any ) {
    const popover = await this.popoverCtrl.create({
      component: PrivateChatMenuPopoverComponent,
      componentProps: {},
      event: event
    });

    await popover.present();

    const result = await popover.onDidDismiss();

    if (result.data === 'profile') {
      this.navCtrl.navigateForward(['/users/profile', this.privateRoom.addressee.id]);
    }
  }

  async getChat( id: any ) {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });

    await loading.present();

    this._chatService.getChat(id)
      .subscribe(
        async (resp) => {
          this.loadingFail = false;
          await loading.dismiss();
          this.chat = resp;
          this.messages = this.chat.messages;
          this.loaded = true;
          this.scrollBottomChat();
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

  pushMessage( event ) {
    this.messages.push(event);
    this.scrollBottomChat();
  }

  private scrollBottomChat() {
    setTimeout( () => {
      this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
    }, 50);
  }

}
