import { TestBed, inject } from '@angular/core/testing';

import { AddControlService } from './add-control.service';

describe('AddControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddControlService]
    });
  });

  it('should be created', inject([AddControlService], (service: AddControlService) => {
    expect(service).toBeTruthy();
  }));
});
