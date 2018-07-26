import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateChecklistStatusComponent } from './update-checklist-status.component';

describe('UpdateChecklistStatusComponent', () => {
  let component: UpdateChecklistStatusComponent;
  let fixture: ComponentFixture<UpdateChecklistStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateChecklistStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateChecklistStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
