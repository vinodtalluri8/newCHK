import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerChecklistsComponent } from './manager-checklists.component';

describe('ManagerChecklistsComponent', () => {
  let component: ManagerChecklistsComponent;
  let fixture: ComponentFixture<ManagerChecklistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerChecklistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerChecklistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
