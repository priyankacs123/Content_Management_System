import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cat8Component } from './cat8.component';

describe('Cat8Component', () => {
  let component: Cat8Component;
  let fixture: ComponentFixture<Cat8Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Cat8Component]
    });
    fixture = TestBed.createComponent(Cat8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
