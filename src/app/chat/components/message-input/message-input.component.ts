import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MessagesService } from 'src/app/services/messages-service/messages.service';
import { IMessage } from 'src/app/interfaces/i-message.interface';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { ChatService } from 'src/app/services/chat-service/chat.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss'],
})
export class MessageInputComponent implements OnInit {

  // @Output() sendMessage = new EventEmitter<IMessage>();
  @Input() idChat: string;
  text = '';
  newMessage: IMessage;


  constructor(
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private _messagesService: MessagesService,
    private camera: Camera,
    public _chatService: ChatService
  ) { }

  ngOnInit() {
    this.resetMessage();
  }

  send() {
    if ((this.text.trim().length === 0) && this.newMessage.image === '') {
      return;
    }

    this.newMessage.content = this.text;

    this._messagesService.newMessage(this.newMessage, this.idChat).subscribe(
      resp => {
        console.log(resp);
        // this.sendMessage.emit(resp);
        this._chatService.sendMessage( resp, this.idChat );
        this.text = '';
        this.resetMessage();
      },
      async (error) => {
        (await this.alertCtrl.create({
          header: 'Oops, something has gone wrong ...',
          message: 'Please, try again',
          buttons: [
            {
              text: 'Ok',
              role: 'ok'
            }
          ]
        })).present();
      }
    );
  }

  resetMessage() {
    this.newMessage = {
      content: '',
      image: ''
    };
  }

  async openActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Choose one',
      mode: 'ios',
      buttons: [
        {
          text: 'Camera',
          icon: 'camera',
          cssClass: 'text-dark',
          handler: () => {
            this.takePhoto();
          }
        },
        {
          text: 'Gallery',
          icon: 'images',
          cssClass: 'text-dark',
          handler: () => {
            this.pickFromGallery();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

   // Camera functions

   async takePhoto() {
    const options: CameraOptions = {
      targetWidth: 640, // max width 640px
      targetHeight: 640, // max height 640px
      allowEdit: true,
      destinationType: this.camera.DestinationType.DATA_URL // Base64
    };

    await this.getPicture(options);
  }

  async pickFromGallery() {
    const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      targetWidth: 640, // max width 640px
      targetHeight: 640, // max height 640px
      allowEdit: true,
      destinationType: this.camera.DestinationType.DATA_URL // Base64
    };

    await this.getPicture(options);
  }

  private async getPicture(options: CameraOptions) {
    const imageData = await this.camera.getPicture(options);
    this.newMessage.image = 'data:image/jpeg;base64,' + imageData;
  }
}
