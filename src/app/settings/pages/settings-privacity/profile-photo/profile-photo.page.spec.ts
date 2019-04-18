import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePhotoPage } from './profile-photo.page';

describe('ProfilePhotoPage', () => {
  let component: ProfilePhotoPage;
  let fixture: ComponentFixture<ProfilePhotoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePhotoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePhotoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
