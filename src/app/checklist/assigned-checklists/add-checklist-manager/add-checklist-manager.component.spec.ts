import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChecklistManagerComponent } from './add-checklist-manager.component';

describe('AddChecklistManagerComponent', () => {
  let component: AddChecklistManagerComponent;
  let fixture: ComponentFixture<AddChecklistManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddChecklistManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChecklistManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
