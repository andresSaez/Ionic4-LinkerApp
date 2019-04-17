import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseExceptionPage } from './choose-exception.page';

describe('ChooseExceptionPage', () => {
  let component: ChooseExceptionPage;
  let fixture: ComponentFixture<ChooseExceptionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseExceptionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseExceptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
