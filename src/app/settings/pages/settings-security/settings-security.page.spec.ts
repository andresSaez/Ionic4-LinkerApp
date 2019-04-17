import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsSecurityPage } from './settings-security.page';

describe('SettingsSecurityPage', () => {
  let component: SettingsSecurityPage;
  let fixture: ComponentFixture<SettingsSecurityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsSecurityPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsSecurityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
