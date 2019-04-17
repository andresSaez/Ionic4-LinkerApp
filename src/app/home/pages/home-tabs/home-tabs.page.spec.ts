import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTabsPage } from './home-tabs.page';

describe('HomeTabsPage', () => {
  let component: HomeTabsPage;
  let fixture: ComponentFixture<HomeTabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTabsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
