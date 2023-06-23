import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserportalComponent } from './userportal.component';

describe('UserportalComponent', () => {
  let component: UserportalComponent;
  let fixture: ComponentFixture<UserportalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserportalComponent]
    });
    fixture = TestBed.createComponent(UserportalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
