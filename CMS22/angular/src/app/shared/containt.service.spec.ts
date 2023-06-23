import { TestBed } from '@angular/core/testing';

import { ContaintService } from './containt.service';

describe('ContaintService', () => {
  let service: ContaintService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContaintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
