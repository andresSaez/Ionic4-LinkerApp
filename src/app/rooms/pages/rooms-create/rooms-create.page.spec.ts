import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsCreatePage } from './rooms-create.page';

describe('RoomsCreatePage', () => {
  let component: RoomsCreatePage;
  let fixture: ComponentFixture<RoomsCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomsCreatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomsCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
