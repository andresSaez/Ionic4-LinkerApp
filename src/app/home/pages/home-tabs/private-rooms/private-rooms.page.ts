import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-private-rooms',
  templateUrl: './private-rooms.page.html',
  styleUrls: ['./private-rooms.page.scss'],
})
export class PrivateRoomsPage implements OnInit {

  constructor(
    private nav: NavController
  ) { }

  ngOnInit() {
  }

  openChat() {
    this.nav.navigateForward(['/chat']);
  }

}
