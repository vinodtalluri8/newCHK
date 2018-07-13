import { TestBed, inject } from '@angular/core/testing';

import { AddExistingControlService } from './add-existing-control.service';

describe('AddExistingControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddExistingControlService]
    });
  });

  it('should be created', inject([AddExistingControlService], (service: AddExistingControlService) => {
    expect(service).toBeTruthy();
  }));
});
