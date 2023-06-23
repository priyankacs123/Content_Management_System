import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cat5Component } from './cat5.component';

describe('Cat5Component', () => {
  let component: Cat5Component;
  let fixture: ComponentFixture<Cat5Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Cat5Component]
    });
    fixture = TestBed.createComponent(Cat5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
