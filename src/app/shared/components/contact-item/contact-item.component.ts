import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IRoom } from 'src/app/interfaces/i-room.interface';
import { IPrivateRoom } from 'src/app/interfaces/i-private-room.interface';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.scss'],
})
export class ContactItemComponent implements OnInit {

  @Input() group: boolean;
  @Input() sliding: boolean;
  @Input() room: IRoom;
  @Input() privateRoom: IPrivateRoom;
  @Output() deleted = new EventEmitter<void>();

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  deleteRoom() {
    this.deleted.emit();
  }

  openChat( room: IRoom ) {
    this.navCtrl.navigateForward(['/chat/room', room.id ]);
  }

}
