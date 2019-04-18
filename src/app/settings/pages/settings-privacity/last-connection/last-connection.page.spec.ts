import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastConnectionPage } from './last-connection.page';

describe('LastConnectionPage', () => {
  let component: LastConnectionPage;
  let fixture: ComponentFixture<LastConnectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastConnectionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastConnectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
