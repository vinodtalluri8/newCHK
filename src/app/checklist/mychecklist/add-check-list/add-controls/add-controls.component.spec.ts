import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddControlsComponent } from './add-controls.component';

describe('AddControlsComponent', () => {
  let component: AddControlsComponent;
  let fixture: ComponentFixture<AddControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
