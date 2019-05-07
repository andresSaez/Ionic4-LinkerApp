import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Events } from '@ionic/angular';


@Component({
  selector: 'app-home-tabs',
  templateUrl: './home-tabs.page.html',
  styleUrls: ['./home-tabs.page.scss'],
})
export class HomeTabsPage implements OnInit {

  constructor(
    private route: ActivatedRoute, private events: Events
  ) { }

  ngOnInit() {
  }

  changeTab(event) {
    // this.events.publish('changes', {});
  }

}
