import { TestBed, inject } from '@angular/core/testing';

import { CreateControlService } from './create-control.service';

describe('CreateControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateControlService]
    });
  });

  it('should be created', inject([CreateControlService], (service: CreateControlService) => {
    expect(service).toBeTruthy();
  }));
});
