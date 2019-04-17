import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsLocationPage } from './events-location.page';

describe('EventsLocationPage', () => {
  let component: EventsLocationPage;
  let fixture: ComponentFixture<EventsLocationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsLocationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsLocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
