import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsHomePage } from './settings-home.page';

describe('SettingsHomePage', () => {
  let component: SettingsHomePage;
  let fixture: ComponentFixture<SettingsHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsHomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
