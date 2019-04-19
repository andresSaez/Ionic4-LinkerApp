import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyContactsPage } from './my-contacts.page';

describe('MyContactsPage', () => {
  let component: MyContactsPage;
  let fixture: ComponentFixture<MyContactsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyContactsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyContactsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
