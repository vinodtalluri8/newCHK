import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineChecklistControlsComponent } from './online-checklist-controls.component';

describe('OnlineChecklistControlsComponent', () => {
  let component: OnlineChecklistControlsComponent;
  let fixture: ComponentFixture<OnlineChecklistControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineChecklistControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineChecklistControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
