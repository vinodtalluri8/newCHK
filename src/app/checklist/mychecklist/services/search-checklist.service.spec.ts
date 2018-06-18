import { TestBed, inject } from '@angular/core/testing';

import { SearchChecklistService } from './search-checklist.service';

describe('SearchChecklistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchChecklistService]
    });
  });

  it('should be created', inject([SearchChecklistService], (service: SearchChecklistService) => {
    expect(service).toBeTruthy();
  }));
});
