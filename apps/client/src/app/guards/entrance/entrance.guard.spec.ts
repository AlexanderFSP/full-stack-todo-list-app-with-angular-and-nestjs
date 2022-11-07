import { TestBed } from '@angular/core/testing';

import { EntranceGuard } from './entrance.guard';

describe('EntranceGuard', () => {
  let guard: EntranceGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EntranceGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
