import { TestBed } from '@angular/core/testing';

import { BranchOptedService } from './branch-opted.service';

describe('BranchOptedService', () => {
  let service: BranchOptedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BranchOptedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
