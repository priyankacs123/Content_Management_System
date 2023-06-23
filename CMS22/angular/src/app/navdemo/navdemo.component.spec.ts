import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavdemoComponent } from './navdemo.component';

describe('NavdemoComponent', () => {
  let component: NavdemoComponent;
  let fixture: ComponentFixture<NavdemoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavdemoComponent]
    });
    fixture = TestBed.createComponent(NavdemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
