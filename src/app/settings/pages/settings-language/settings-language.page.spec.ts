import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsLanguagePage } from './settings-language.page';

describe('SettingsLanguagePage', () => {
  let component: SettingsLanguagePage;
  let fixture: ComponentFixture<SettingsLanguagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsLanguagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsLanguagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
