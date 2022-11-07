import { TestBed } from '@angular/core/testing';

import { EntranceFormService } from './entrance-form.service';

describe('EntranceFormService', () => {
  let service: EntranceFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntranceFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
