import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCategoryIncomeComponent } from './list-category-income.component';

describe('ListCategoryIncomeComponent', () => {
  let component: ListCategoryIncomeComponent;
  let fixture: ComponentFixture<ListCategoryIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCategoryIncomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCategoryIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
