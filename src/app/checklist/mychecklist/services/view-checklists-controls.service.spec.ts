import { TestBed, inject } from '@angular/core/testing';

import { ViewChecklistsControlsService } from './view-checklists-controls.service';

describe('ViewChecklistsControlsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewChecklistsControlsService]
    });
  });

  it('should be created', inject([ViewChecklistsControlsService], (service: ViewChecklistsControlsService) => {
    expect(service).toBeTruthy();
  }));
});
