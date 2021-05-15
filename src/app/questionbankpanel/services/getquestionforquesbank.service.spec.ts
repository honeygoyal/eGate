import { TestBed } from '@angular/core/testing';

import { GetquestionforquesbankService } from './getquestionforquesbank.service';

describe('GetquestionforquesbankService', () => {
  let service: GetquestionforquesbankService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetquestionforquesbankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
