import { TestBed } from '@angular/core/testing';

import { PrimariesService } from './primaries.service';

describe('PrimariesService', () => {
  let service: PrimariesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrimariesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
