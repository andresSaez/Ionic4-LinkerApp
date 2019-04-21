import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rooms-create',
  templateUrl: './rooms-create.page.html',
  styleUrls: ['./rooms-create.page.scss'],
})
export class RoomsCreatePage implements OnInit {

  user = {
    name: '',
    nick: '',
    email: '',
    biography: '',
    interests: [ 'jamon', 'arroz', 'correr' ]
  };

  hastag = '';

  hastagList: string[] = [];

  constructor() { }

  ngOnInit() {
  }

  submitCreateRoomForm() {

  }

  deleteHastag( hastag: string ) {
    this.user.interests = this.user.interests.filter( i => i !== hastag);
  }

  addHastag() {
    this.user.interests.push( this.hastag );
    this.hastag = '';
  }


}
