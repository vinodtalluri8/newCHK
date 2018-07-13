import { TestBed, inject } from '@angular/core/testing';

import { ChecklistManagersService } from './checklist-managers.service';

describe('ChecklistManagersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChecklistManagersService]
    });
  });

  it('should be created', inject([ChecklistManagersService], (service: ChecklistManagersService) => {
    expect(service).toBeTruthy();
  }));
});
