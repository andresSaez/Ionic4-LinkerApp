import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateRoomsPage } from './private-rooms.page';

describe('PrivateRoomsPage', () => {
  let component: PrivateRoomsPage;
  let fixture: ComponentFixture<PrivateRoomsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateRoomsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateRoomsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
