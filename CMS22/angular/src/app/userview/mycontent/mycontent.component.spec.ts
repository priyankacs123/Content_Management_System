import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycontentComponent } from './mycontent.component';

describe('MycontentComponent', () => {
  let component: MycontentComponent;
  let fixture: ComponentFixture<MycontentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MycontentComponent]
    });
    fixture = TestBed.createComponent(MycontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
