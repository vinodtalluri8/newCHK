import { TestBed, inject } from '@angular/core/testing';

import { AddchecklistService } from './addchecklist.service';

describe('AddchecklistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddchecklistService]
    });
  });

  it('should be created', inject([AddchecklistService], (service: AddchecklistService) => {
    expect(service).toBeTruthy();
  }));
});
