import { TestBed, inject } from '@angular/core/testing';

import { AssignedChecklistService } from './assigned-checklist.service';

describe('AssignedChecklistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssignedChecklistService]
    });
  });

  it('should be created', inject([AssignedChecklistService], (service: AssignedChecklistService) => {
    expect(service).toBeTruthy();
  }));
});
