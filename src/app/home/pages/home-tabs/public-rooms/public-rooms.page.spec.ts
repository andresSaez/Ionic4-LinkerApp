import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicRoomsPage } from './public-rooms.page';

describe('PublicRoomsPage', () => {
  let component: PublicRoomsPage;
  let fixture: ComponentFixture<PublicRoomsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicRoomsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicRoomsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
