import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedChecklistsComponent } from './assigned-checklists.component';

describe('AssignedChecklistsComponent', () => {
  let component: AssignedChecklistsComponent;
  let fixture: ComponentFixture<AssignedChecklistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignedChecklistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedChecklistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
