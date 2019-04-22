import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-select-location',
  templateUrl: './select-location.component.html',
  styleUrls: ['./select-location.component.scss'],
})
export class SelectLocationComponent implements OnInit, AfterViewInit {

  zoom = 17;
  @Input() lat;
  @Input() lng;

  position = {
    lat: 0,
    lng: 0
  };

  constructor(
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.position = {
      lat: this.lat,
      lng: this.lng
    };
  }

  ngAfterViewInit() {}

  selectPosition() {
    this.modalCtrl.dismiss(this.position);
  }

  cancel() {
    this.modalCtrl.dismiss(this.position = {
      lat: this.lat,
      lng: this.lng
    });
  }

}
