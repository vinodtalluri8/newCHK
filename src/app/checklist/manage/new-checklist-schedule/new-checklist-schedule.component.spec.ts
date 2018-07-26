import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChecklistScheduleComponent } from './new-checklist-schedule.component';

describe('NewChecklistScheduleComponent', () => {
  let component: NewChecklistScheduleComponent;
  let fixture: ComponentFixture<NewChecklistScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewChecklistScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewChecklistScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
