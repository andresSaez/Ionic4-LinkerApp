import { TestBed } from '@angular/core/testing';

import { RoomDetailsResolverService } from './room-details-resolver.service';

describe('RoomDetailsResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoomDetailsResolverService = TestBed.get(RoomDetailsResolverService);
    expect(service).toBeTruthy();
  });
});
