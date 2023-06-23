import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cat7Component } from './cat7.component';

describe('Cat7Component', () => {
  let component: Cat7Component;
  let fixture: ComponentFixture<Cat7Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Cat7Component]
    });
    fixture = TestBed.createComponent(Cat7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
