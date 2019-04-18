import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminateAccountComponent } from './eliminate-account.component';

describe('EliminateAccountComponent', () => {
  let component: EliminateAccountComponent;
  let fixture: ComponentFixture<EliminateAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminateAccountComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
