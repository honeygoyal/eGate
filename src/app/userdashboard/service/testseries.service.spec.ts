import { TestBed } from '@angular/core/testing';

import { TestseriesService } from './testseries.service';

describe('TestseriesService', () => {
  let service: TestseriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestseriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
