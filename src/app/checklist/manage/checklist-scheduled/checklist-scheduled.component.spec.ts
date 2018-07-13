import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistScheduledComponent } from './checklist-scheduled.component';

describe('ChecklistScheduledComponent', () => {
  let component: ChecklistScheduledComponent;
  let fixture: ComponentFixture<ChecklistScheduledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecklistScheduledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistScheduledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
