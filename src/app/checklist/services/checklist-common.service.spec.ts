import { TestBed, inject } from '@angular/core/testing';

import { ChecklistCommonService } from './checklist-common.service';

describe('ChecklistCommonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChecklistCommonService]
    });
  });

  it('should be created', inject([ChecklistCommonService], (service: ChecklistCommonService) => {
    expect(service).toBeTruthy();
  }));
});
