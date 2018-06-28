import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledChecklistComponent } from './scheduled-checklist.component';

describe('ScheduledChecklistComponent', () => {
  let component: ScheduledChecklistComponent;
  let fixture: ComponentFixture<ScheduledChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduledChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduledChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
