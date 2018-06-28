import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowupChecklistComponent } from './followup-checklist.component';

describe('FollowupChecklistComponent', () => {
  let component: FollowupChecklistComponent;
  let fixture: ComponentFixture<FollowupChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowupChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowupChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
