import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieCategoryComponent } from './pie-category.component';

describe('PieCategoryComponent', () => {
  let component: PieCategoryComponent;
  let fixture: ComponentFixture<PieCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PieCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
