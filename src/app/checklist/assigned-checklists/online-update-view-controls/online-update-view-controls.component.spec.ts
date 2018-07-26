import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineUpdateViewControlsComponent } from './online-update-view-controls.component';

describe('OnlineUpdateViewControlsComponent', () => {
  let component: OnlineUpdateViewControlsComponent;
  let fixture: ComponentFixture<OnlineUpdateViewControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineUpdateViewControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineUpdateViewControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
