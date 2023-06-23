import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cat2Component } from './cat2.component';

describe('Cat2Component', () => {
  let component: Cat2Component;
  let fixture: ComponentFixture<Cat2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Cat2Component]
    });
    fixture = TestBed.createComponent(Cat2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
