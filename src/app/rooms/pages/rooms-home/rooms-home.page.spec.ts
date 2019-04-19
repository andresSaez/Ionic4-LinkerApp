import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsHomePage } from './rooms-home.page';

describe('RoomsHomePage', () => {
  let component: RoomsHomePage;
  let fixture: ComponentFixture<RoomsHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomsHomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomsHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
