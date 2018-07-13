import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistManagerComponent } from './checklist-manager.component';

describe('ChecklistManagerComponent', () => {
  let component: ChecklistManagerComponent;
  let fixture: ComponentFixture<ChecklistManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecklistManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
