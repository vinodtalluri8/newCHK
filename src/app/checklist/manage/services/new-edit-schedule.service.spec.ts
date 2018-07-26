import { TestBed, inject } from '@angular/core/testing';

import { NewEditScheduleService } from './new-edit-schedule.service';

describe('NewEditScheduleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewEditScheduleService]
    });
  });

  it('should be created', inject([NewEditScheduleService], (service: NewEditScheduleService) => {
    expect(service).toBeTruthy();
  }));
});
