import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cat6Component } from './cat6.component';

describe('Cat6Component', () => {
  let component: Cat6Component;
  let fixture: ComponentFixture<Cat6Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Cat6Component]
    });
    fixture = TestBed.createComponent(Cat6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
