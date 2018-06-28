import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageChecklistManagersComponent } from './manage-checklist-managers.component';

describe('ManageChecklistManagersComponent', () => {
  let component: ManageChecklistManagersComponent;
  let fixture: ComponentFixture<ManageChecklistManagersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageChecklistManagersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageChecklistManagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
