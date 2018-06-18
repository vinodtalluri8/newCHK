import { TestBed, inject } from '@angular/core/testing';

import { SearchControlService } from './search-control.service';

describe('SearchControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchControlService]
    });
  });

  it('should be created', inject([SearchControlService], (service: SearchControlService) => {
    expect(service).toBeTruthy();
  }));
});
