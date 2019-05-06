import { TestBed } from '@angular/core/testing';

import { PrivateRoomResolverService } from './private-room-resolver.service';

describe('PrivateRoomResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrivateRoomResolverService = TestBed.get(PrivateRoomResolverService);
    expect(service).toBeTruthy();
  });
});
