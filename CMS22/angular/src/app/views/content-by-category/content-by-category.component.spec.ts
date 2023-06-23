import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentByCategoryComponent } from './content-by-category.component';

describe('ContentByCategoryComponent', () => {
  let component: ContentByCategoryComponent;
  let fixture: ComponentFixture<ContentByCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContentByCategoryComponent]
    });
    fixture = TestBed.createComponent(ContentByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
