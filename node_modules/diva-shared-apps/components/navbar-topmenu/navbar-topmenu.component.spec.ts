import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarTopmenuComponent } from './navbar-topmenu.component';

describe('NavbarTopmenuComponent', () => {
  let component: NavbarTopmenuComponent;
  let fixture: ComponentFixture<NavbarTopmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarTopmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarTopmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
