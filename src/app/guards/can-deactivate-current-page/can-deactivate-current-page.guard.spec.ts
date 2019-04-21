import { TestBed, async, inject } from '@angular/core/testing';

import { CanDeactivateCurrentPageGuard } from './can-deactivate-current-page.guard';

describe('CanDeactivateCurrentPageGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanDeactivateCurrentPageGuard]
    });
  });

  it('should ...', inject([CanDeactivateCurrentPageGuard], (guard: CanDeactivateCurrentPageGuard) => {
    expect(guard).toBeTruthy();
  }));
});
