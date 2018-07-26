import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsChecklistComponent } from './comments-checklist.component';

describe('CommentsChecklistComponent', () => {
  let component: CommentsChecklistComponent;
  let fixture: ComponentFixture<CommentsChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentsChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
