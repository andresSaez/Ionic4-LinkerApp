import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { IRoom } from 'src/app/interfaces/i-room.interface';
import { IUser } from 'src/app/interfaces/i-user.interface';
import { MapComponent } from 'ngx-mapbox-gl';

@Component({
  selector: 'app-events-location',
  templateUrl: './events-location.page.html',
  styleUrls: ['./events-location.page.scss'],
})
export class EventsLocationPage implements OnInit, AfterViewInit {

  zoom = 10;

  rooms: IRoom[] = [];
  loguedUser: IUser;

  @ViewChild(MapComponent) mapComp: MapComponent;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.mapComp.load.subscribe(
      () => {
      this.mapComp.mapInstance.resize(); // Necessary for full height
      }
      );
  }

}
