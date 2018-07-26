import { TestBed, inject } from '@angular/core/testing';

import { SearchOnlineChecklistResultService } from './search-online-checklist-result.service';

describe('SearchOnlineChecklistResultService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchOnlineChecklistResultService]
    });
  });

  it('should be created', inject([SearchOnlineChecklistResultService], (service: SearchOnlineChecklistResultService) => {
    expect(service).toBeTruthy();
  }));
});
