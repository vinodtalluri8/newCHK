import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedChecklistComponent } from './closed-checklist.component';

describe('ClosedChecklistComponent', () => {
  let component: ClosedChecklistComponent;
  let fixture: ComponentFixture<ClosedChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosedChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
