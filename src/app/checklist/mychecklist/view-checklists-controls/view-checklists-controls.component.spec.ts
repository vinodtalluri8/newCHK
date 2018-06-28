import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewChecklistsControlsComponent } from './view-checklists-controls.component';

describe('ViewChecklistsControlsComponent', () => {
  let component: ViewChecklistsControlsComponent;
  let fixture: ComponentFixture<ViewChecklistsControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewChecklistsControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewChecklistsControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
