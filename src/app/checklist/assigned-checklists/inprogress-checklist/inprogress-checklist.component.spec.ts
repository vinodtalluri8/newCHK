import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InprogressChecklistComponent } from './inprogress-checklist.component';

describe('InprogressChecklistComponent', () => {
  let component: InprogressChecklistComponent;
  let fixture: ComponentFixture<InprogressChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InprogressChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InprogressChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
