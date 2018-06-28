import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwaitingChecklistComponent } from './awaiting-checklist.component';

describe('AwaitingChecklistComponent', () => {
  let component: AwaitingChecklistComponent;
  let fixture: ComponentFixture<AwaitingChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AwaitingChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwaitingChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
