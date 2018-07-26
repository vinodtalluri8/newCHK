import { TestBed, inject } from '@angular/core/testing';

import { OnlineChecklistService } from './online-checklist.service';

describe('OnlineChecklistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OnlineChecklistService]
    });
  });

  it('should be created', inject([OnlineChecklistService], (service: OnlineChecklistService) => {
    expect(service).toBeTruthy();
  }));
});

