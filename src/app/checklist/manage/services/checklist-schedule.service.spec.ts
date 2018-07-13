import { TestBed, inject } from '@angular/core/testing';

import { ChecklistScheduleService } from './checklist-schedule.service';

describe('ChecklistScheduleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChecklistScheduleService]
    });
  });

  it('should be created', inject([ChecklistScheduleService], (service: ChecklistScheduleService) => {
    expect(service).toBeTruthy();
  }));
});
