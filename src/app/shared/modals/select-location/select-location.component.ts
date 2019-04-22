import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Result } from 'ngx-mapbox-gl/lib/control/geocoder-control.directive';
import { MapComponent } from 'ngx-mapbox-gl';
import { MapMouseEvent } from 'mapbox-gl';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-select-location',
  templateUrl: './select-location.component.html',
  styleUrls: ['./select-location.component.scss'],
})
export class SelectLocationComponent implements OnInit, AfterViewInit {

  zoom = 10;
  @Input() lat;
  @Input() lng;

  position = {
    lat: 0,
    lng: 0
  };

  @ViewChild(MapComponent) mapComp: MapComponent;

  constructor(
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.position = {
      lat: this.lat,
      lng: this.lng
    };
    this.chargeMap();
  }

  ngAfterViewInit() {
    this.mapComp.load.subscribe(
      () => {
      this.mapComp.mapInstance.resize(); // Necessary for full height
      }
      );
  }

  selectPosition() {
    this.modalCtrl.dismiss(this.position);
  }

  cancel() {
    this.modalCtrl.dismiss(this.position = {
      lat: null,
      lng: null
    });
  }

  chargeMap() {
    this.mapComp.click.subscribe( (ev: MapMouseEvent) => {
      this.position.lat = ev.lngLat.lat;
      this.position.lng = ev.lngLat.lng;

    });
  }

}
