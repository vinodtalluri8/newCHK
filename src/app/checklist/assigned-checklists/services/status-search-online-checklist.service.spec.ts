import { TestBed, inject } from '@angular/core/testing';

import { StatusSearchOnlineChecklistService } from './status-search-online-checklist.service';

describe('StatusSearchOnlineChecklistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StatusSearchOnlineChecklistService]
    });
  });

  it('should be created', inject([StatusSearchOnlineChecklistService], (service: StatusSearchOnlineChecklistService) => {
    expect(service).toBeTruthy();
  }));
});
