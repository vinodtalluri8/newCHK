import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlAssociateEditComponent } from './control-associate-edit.component';

describe('ControlAssociateEditComponent', () => {
  let component: ControlAssociateEditComponent;
  let fixture: ComponentFixture<ControlAssociateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlAssociateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlAssociateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
