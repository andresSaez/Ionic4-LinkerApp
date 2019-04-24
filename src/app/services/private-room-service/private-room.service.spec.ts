import { TestBed } from '@angular/core/testing';

import { PrivateRoomService } from './private-room.service';

describe('PrivateRoomService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrivateRoomService = TestBed.get(PrivateRoomService);
    expect(service).toBeTruthy();
  });
});
